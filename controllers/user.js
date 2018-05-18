const user = require('../models/User')

class User {

  static getData(req, res) {
    user.getUser(result => {
      res.send(result)
    })
  }

  static getDataById(req, res) {
    user.getUserById(req.params, (result) => {
      res.send(result)
    })
  }

  static getUniqueDataEmail(req, res) {
    user.getUniqueEmail(req.params, (result) => {
      res.send(result)
    })
  }

  static getUniqueDataUsername(req, res) {
    user.getUniqueUsername(req.params, (result) => {
      res.send(result)
    })
  }

  static signUp(req, res) {
    user.signUp(req.body, (result, auth) => {
      if (result) {
        res.send(result)
      } else {
        res.send(auth)
      }
    })
  }

  static signIn(req, res) {
    user.signIn(req.body, (result, auth) => {
      if (result) {
        res.send(result)
        console.log(result)
      } else {
        res.send(auth)
        console.log(auth)
      }
    })
  }

  static editData(req, res) {
    user.editUser(req.params, req.body, (result) => {
      res.send(result)
    })
  }

}

module.exports = User