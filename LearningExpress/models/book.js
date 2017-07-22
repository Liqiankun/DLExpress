var mongoose = require('mongoose')
var Schema = mongoose.Schema

/* create book schema */
var BookSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  author: {
    type: String
  }
})

/* create book model */
var Book = mongoose.model('Book', BookSchema)

module.exports = Book
