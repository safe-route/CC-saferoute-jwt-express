const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager

const userRoute = require('./src/api/routes/user.route')
const secureRoute = require('./src/api/routes/secure.route')
const connectToDatabase = require('./databaseConnection')

require('./src/api/middleware/authn')
require('dotenv').config()

const app = express()
app.use(passport.initialize())

const HOST = process.env.HOST || 'http://localhost'
const PORT = parseInt(process.env.PORT || '3000')

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', userRoute)

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute)

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

const server = app.listen(PORT, async () => {
  await connectToDatabase()
  console.log(`Application started on URL ${HOST}:${PORT}`)
})

const shutdownManager = new GracefulShutdownManager(server)

process.on('SIGTERM', () => {
  shutdownManager.terminate(() => {
    console.log('Server is gracefully terminated')
  })
})
