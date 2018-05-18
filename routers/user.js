const express = require('express')
const router = express.Router()
const User = require('../controllers/User')
const multer = require('multer')
const upload = multer({
  dest: 'assets/image/'
})

router.get('/', User.getData)

router.get('/id/:id', User.getDataById)

router.get('/email/:email', User.getUniqueDataEmail)

router.get('/username/:username', User.getUniqueDataUsername)

router.post('/signup', User.signUp)

router.post('/signin', User.signIn)

router.put('/edit/:id', User.editData)

module.exports = router