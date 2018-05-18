const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')
const fs = require('fs')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjU0YzMzYzIyMDcxMmViYzY2YTFmNSIsImVtYWlsIjoicGFuZ2tleWRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJwYW5na2V5ZCIsImlhdCI6MTUyNjI2NTkzNn0.BCrQ3QjI2lZ8HinmZIqwE5u97gf4UoJmkwtPxwG-f6Y'

chai.use(chaiHttp)

describe('/GET || get user', () => {
  it('it should be GET user', (done) => {
    chai.request(server)
    .get('/user')
    .end((err, res) => {
      if (err) done(err)
      res.should.have.status(200)
      done()
    })
  }).timeout(10000)
})

describe('/GET || get user by id', () => {
  it('it should be GET user by id', (done) => {
    chai.request(server)
    .get('/user')
    .end((error, response) => {
      chai.request(server)
      .get('/user/id/' + response.body[0]._id)
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  }).timeout(10000)
})

describe('/GET || get unique email user', () => {
  it('it should be GET unique email user', (done) => {
    chai.request(server)
    .get('/user')
    .end((error, response) => {
      chai.request(server)
      .get('/user/email/' + response.body[0].email)
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  }).timeout(10000)
})

describe('/GET || get unique username user', () => {
  it('it should be GET unique username user', (done) => {
    chai.request(server)
    .get('/user')
    .end((error, response) => {
      chai.request(server)
      .get('/user/username/' + response.body[0].username)
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  }).timeout(10000)
})

describe('/POST || post signup user', () => {
  it('it should be POST signup user', (done) => {
    chai.request(server)
    .post('/user/signup')
    .send({
      'email': 'pangkeyd@gmail.com',
      'username': 'pangkeyd',
      'password': '12345678'
    })
    .end((err, res) => {
      if (err) done(err)
      res.should.have.status(200)
      done()
    })
  }).timeout(10000)
})

describe('/POST || post signin user with email and true', () => {
  it('it should be POST signin user with email and true', (done) => {
    chai.request(server)
    .post('/user/signin')
    .send({
      'email': 'pangkeyd@gmail.com',
      'password': '12345678'
    })
    .end((err, res) => {
      if (err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})

describe('/POST || post signin user with email and false', () => {
  it('it should be POST signin user with email and false', (done) => {
    chai.request(server)
    .post('/user/signin')
    .send({
      'email': 'pangkeyd@gmail.com',
      'password': 'asdasdassdad'
    })
    .end((err, res) => {
      if (err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})

describe('/POST || post signin user with username and true', () => {
  it('it should be POST signin user with username and true', (done) => {
    chai.request(server)
    .post('/user/signin')
    .send({
      'username': 'pangkeyd',
      'password': '12345678'
    })
    .end((err, res) => {
      if (err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})

describe('/POST || post signin user with username and false', () => {
  it('it should be POST signin user with username and false', (done) => {
    chai.request(server)
    .post('/user/signin')
    .send({
      'username': 'pangkeyd',
      'password': 'asdasdasd'
    })
    .end((err, res) => {
      if (err) done(err)
      res.should.have.status(200)
      done()
    })
  })
})

describe('/PUT || put update user', () => {
  it('it should be PUT update user', (done) => {
    chai.request(server)
    .get('/user')
    .end((error, response) => {
      chai.request(server)
      .put('/user/edit/' + response.body[0]._id)
      .attach('image', fs.readFileSync('image.jpg'), 'image.jpg')
      .field('email', 'edit email')
      .field('username', 'edit username')
      .field('password', 'edit password')
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  })
})