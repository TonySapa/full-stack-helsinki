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
  console.log('fav blog' + JSON.stringify(fav));
  return JSON.stringify(fav)
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  favorite
}