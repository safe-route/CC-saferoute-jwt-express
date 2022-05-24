const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

// User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is empty']
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)

  this.password = hash
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
