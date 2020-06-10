const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => likes = likes + blog.likes)
  return likes
}

module.exports = {
  dummy,
  totalLikes
}