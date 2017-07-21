var express = require('express')
var router = express.Router()

/* get the list of books */
router.get('/books', function (req, res) {
  res.send({ name: 'GET' })
})

/* create a new book */
router.post('/books', function (req, res) {
  res.send({
    name: 'POST',
    book_name: req.body.name,
    author: req.body.author
  })
})

/* update book */
router.put('/books/:id', function (req, res) {
  res.send({ name: 'PUT' })
})

/* delete book */
router.delete('/books/:id', function (req, res) {
  res.send({ name: 'DELETE' })
})

module.exports = router
