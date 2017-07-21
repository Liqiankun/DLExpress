var express = require('express')
var routes = require('./routes/api')
/* set up express app */
var app = express()

/* listen fro request */
app.listen(process.env.port || 4000, function () {
  console.log('express begin listening request')
})

/* use router */
app.use('/api', routes)

app.get('/', function (req, res) {
  res.send('GET request')
})
