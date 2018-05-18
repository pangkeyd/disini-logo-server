const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotEnv = require('dotenv').config()
const mongoose = require('mongoose')
const mongoDB = process.env.DB_NAME
const db = mongoose.connection

mongoose.connect(mongoDB)
mongoose.Promise = global.Promise

db.on('error', console.error.bind(console, 'Error koneksi woy!'))

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// ROUTERS

const user = require('./routers/user')

app.use('/user', user)

app.listen(process.env.PORT_DEF, () => {
  console.log('AYO JALAN!')
})

module.exports = app