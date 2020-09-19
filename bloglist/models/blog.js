const mongoose = require('mongoose')
// mongoose.set('useCreateIndex', true)
const uniqueValidator = require('mongoose-unique-validator');
/*mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })*/

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: true
    // minlength: 3
  },
  author: {
    type: String,
    unique: false,
    required: true
    // minlength: 3
  },
  url: {
    type: String,
    unique: false,
    required: true
    // minlength: 3
  },
  likes: {
    type: Number,
    unique: false,
    required: false
    // minlength: 3
  },
  comments: {
    type: Array,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
blogSchema.plugin(uniqueValidator)


module.exports = mongoose.model('Blog', blogSchema)