var express = require('express')
var router = express.Router()
var Book = require('../models/book')

/* get the list of books */
router.get('/books', function (req, res, next) {
  res.send({ name: 'GET' })
})

/* create a new book */
router.post('/books', function (req, res, next) {
  Book.create(req.body, function (err, book) {
    if (err) {
      next(err)
    } else {
      res.json(book)
    }
  })
  /* or */
  // Book.create(req.body).then(function (err, book) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     res.json(book)
  //   }
  // }).catch(next)
})

/* update book */
router.put('/books/:id', function (req, res, next) {
  res.send({ name: 'PUT' })
})

/* delete book */
router.delete('/books/:id', function (req, res, next) {
  res.send({ name: 'DELETE' })
})

module.exports = router
