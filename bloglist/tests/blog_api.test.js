const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  console.log('cleared')
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const res = await api.get('/api/blogs')

  const names = res.body.map(r => {
    expect(r.id).toBeDefined()
  })
})

test('HTTP POST request to /api/blogs creates a new blog post', async () => {
  const newBlog = {
    title: 'Blog added when testing',
    author: 'Toni Sánchez',
    url: 'https://tonisanchez.dev',
    likes: 290
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Overreacted')
})

test('If likes are not specified, likes equal 0', async () => {
  const newBlog = {
    title: 'Not specified likes',
    author: 'Toni Sánchez',
    url: 'https://tonisanchez.dev'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Overreacted')
})

test('If title or url is missing respond with 400', async () => {
  const newBlog = {
    url:'https://titleandauthormissing.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})


afterAll(() => {
  mongoose.connection.close()
})