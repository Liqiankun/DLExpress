var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes/api')
var mongoose = require('mongoose')

/* set up express app */
var app = express()

/* connect to mongodb */
mongoose.connect('mongodb://localhost/expressdemo')
mongoose.Promise = global.Promise

/* use body parser must on the top of the routes */
app.use(bodyParser.json())

/* use router */
app.use('/api', routes)

app.use(function (req, res) {
  res.status(400).send({ error: 'Not Found' })
})

/* error handler */
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message })
})

/* listen fro request */
app.listen(process.env.port || 4000, function () {
  console.log('express begin listening request')
})
