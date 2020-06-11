var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => likes = likes + blog.likes)
  return likes
}

const mostLikes = (blogs) => {
  let max = 0
  blogs.map(blog => blog.likes > max ? max = blog.likes : null)
  return max
}

const favorite = (blogs) => {
  let max = 0
  let fav = {}
  const setFav = (blog) => {
    max = blog.likes
    fav = blog
  }
  blogs.map(blog => blog.likes > max ? setFav(blog) : null)
  console.log(`favorite blog is ${JSON.stringify(fav)}`)
  return JSON.stringify(fav)
}

const mostBlogs = (blogs) => {
  var mostFrequent = {
    author: '',
    blogs: 0
  }
  let authors = []
  const compare = (author) => {
    let x = 0
    authors.push(author)
    authors.map(authorB => (authorB === author) ? x++ : null)
    console.log(`${author} is included in authors ${x} times`)
    if (x > mostFrequent.blogs) {
      mostFrequent.blogs = x
      mostFrequent.author = author
    }
  }
  blogs.map(blog => compare(blog.author))
  console.log(`*** ${mostFrequent.author} times: ${mostFrequent.blogs}`)
  
  return JSON.stringify(mostFrequent)
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  favorite,
  mostBlogs
}