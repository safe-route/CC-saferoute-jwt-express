const mongoose = require('mongoose')

require('dotenv').config()

mongoose.Promise = global.Promise

const { DB_HOST, DB_NAME, DB_PORT } = process.env

const connectToDatabase = async () => {
  await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)

  mongoose.connection.on('connected', function () {
    console.log('Mongoose connection success')
  })

  mongoose.connection.on('error', function (err) {
    console.log('Mongoose has problem connecting: ' + err)
  })

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination')
      process.exit(0)
    })
  })
}

module.exports = connectToDatabase
