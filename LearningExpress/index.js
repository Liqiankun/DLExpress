var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes/api')
/* set up express app */
var app = express()

/* listen fro request */
app.listen(process.env.port || 4000, function () {
  console.log('express begin listening request')
})

/* use body parser must on the top of the routes */
app.use(bodyParser.json())

/* use router */
app.use('/api', routes)
app.get('/', function (req, res) {
  res.send('GET request')
})
