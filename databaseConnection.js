// Connecting to local or running mongodb instance
// Set connection parameters in .env

const mongoose = require('mongoose')

require('dotenv').config()

mongoose.Promise = global.Promise

// Set these variables from env
const { DB_HOST, DB_NAME, DB_PORT } = process.env

const connectToDatabase = async () => {
  await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

  // Print this if connected
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connection success')
  })

  // Throw some error log if encountering error connecting
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose has problem connecting: ' + err)
  })

  // Log if connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
  })

  // If connection is closed by server, log the event
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination')
      process.exit(0)
    })
  })
}

module.exports = connectToDatabase
