var express = require('express')
/* set up express app */
var app = express()
/* listen fro request */
app.listen(process.env.port || 4000, function () {
  console.log('express begin listening request')
})

app.get('/', function (req, res) {
  res.send('GET request')
})
