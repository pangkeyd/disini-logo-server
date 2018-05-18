const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 8
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true
  },
  username: {
    type: String,
    unique: true,
    index: true
  },
  password: String,
  salt: String,
  image: String
})

var User = mongoose.model('User', userSchema)

let getUser = (cb) => {
  User.find({}, (err, user) => {
    if (err) {
      res.send(err).status(500)
    }
    cb(user)
  })
}

let getUserById = (param, cb) => {
  User.find({
    _id: param.id
  }, (err, user) => {
    if (err) res.send(err).status(500)
    cb(user)
  })
}

let getUniqueEmail = (param, cb) => {
  User.find({
    email: param.email
  }, (err, user) => {
    if (err) {
      res.send(err).status(500)
    }
    cb(user)
  })
}

let getUniqueUsername = (param, cb) => {
  User.find({
    username: param.username
  }, (err, user) => {
    if (err) {
      res.send(err).status(500)
    }
    cb(user)
  })
}

let signUp = (body, cb) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(body.password, salt, (err, hash) => {
      let userSchema = new User({
        email: body.email,
        username: body.username,
        password: hash,
        salt: hash,
        image: null
      })
      userSchema.save((err, user) => {
        if (err) {
          if (err.message.indexOf('email_1') !== -1) {
            let errorEmail = 'Email udah ada yang pake!'
            let objError = {
              error: errorEmail
            }
            cb(null, objError)
          } else if (err.message.indexOf('username_1') !== -1) {
            let errorUsername = 'Username udah ada yang pake!'
            let objError = {
              error: errorUsername
            }
            cb(null, objError)
          }
        } else {
          cb(user, null)
        }
      })
    })
  })
}

let signIn = (body, cb) => {
  let query = {
    $or: [{
      email: body.email
    }, {
      username: body.username
    }]
  }

  User.find(query, (err, user) => {
    if (user.length > 0) {
      let resPass = bcrypt.compareSync(body.password, user[0].salt)
      if (resPass) {
        let objUser = {
          id: user[0]._id,
          email: user[0].email,
          username: user[0].username
        }
        let token = jwt.sign(objUser, process.env.SECRET_KEY)
        let objToken = {
          token: token
        }
        cb(objToken, null)
      } else {
        let errorSignIn = 'Email / Username atau Password Salah!'
        let objError = {
          error: errorSignIn
        }
        cb(null, objError)
      }
    } else {
      let errorSignIn = 'Email / Username atau Password Salah!'
      let objError = {
        error: errorSignIn
      }
      cb(null, objError)
    }
  })
}

let editUser = (param, body, cb) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(body.password, salt, (err, hash) => {
      User.update({
        _id: param.id
      }, {
        $set: {
          email: body.email,
          username: body.username,
          password: hash,
          salt: hash
        }
      }, (err, user) => {
        if (err) res.send(err).status(500)
        cb(user)
      })
    })
  })
}

module.exports = {
  getUser,
  getUserById,
  getUniqueEmail,
  getUniqueUsername,
  signUp,
  signIn,
  editUser
}