var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => likes = likes + blog.likes)
  return likes
}

const mostLikedBlog = (blogs) => {
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
  // console.log(`favorite blog is ${JSON.stringify(fav)}`)
  return JSON.stringify(fav)
}

const mostBlogs = (blogs) => {
  var mostFrequent = { author: '', blogs: 0 };
  let authors = [];
  const compare = (author) => {
    let x = 0
    authors.push(author)
    authors.map(authorB => (authorB === author) ? x++ : null)
    // console.log(`${author} is included in authors ${x} times`)
    if (x > mostFrequent.blogs) {
      mostFrequent.blogs = x
      mostFrequent.author = author
    }
  }
  blogs.map(blog => compare(blog.author))
  // console.log(`*** ${mostFrequent.author} times: ${mostFrequent.blogs}`)
  
  return JSON.stringify(mostFrequent)
}

const mostLikes = (blogs) => {
  var authors = [];
  var topLiked = { author: '', likes: 0 };

  blogs.map(blog => {
    // console.log(`-> Position: Blog ${JSON.stringify(blog)}`);
    let included = false;
    const updateLikes = (writer, likes) => {
      writer.likes = likes;
    }
    authors.map(authorB => {
      if (authorB.author === blog.author) {
        // console.log(`-> ${blog.author} is included on authors[] with '${blog.likes}' likes`);
        included = true;
        let likes = authorB.likes + blog.likes;
        updateLikes(authorB, likes);
        // console.log(`-> ${blog.author} had ${authorB.likes} likes + ${blog.likes} has now '${likes}' likes`);
        (likes > topLiked.likes) ? (topLiked.likes = topLiked.likes + likes, topLiked.author = authorB.author) : null
      }
    })
    (included) ? included = false : authors.push(blog);
      // console.log(`-> Added ${blog.author} to authors[]`);
  })
  // authors.map(author => console.log(`${JSON.stringify(author.author)}, likes: ${JSON.stringify(author.likes)}`));
  return JSON.stringify(topLiked);
}

module.exports = {
  dummy,
  totalLikes,
  favorite,
  mostBlogs,
  mostLikes
}