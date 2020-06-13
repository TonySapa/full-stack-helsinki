const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Overreacted',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/',
    likes: 33
  },
  {
    title: 'David Walsh Blog',
    author: 'David Walsh',
    url: 'https://davidwalsh.name/',
    likes: 19
  }
]

/*const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}*/

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb //, nonExistingId
}