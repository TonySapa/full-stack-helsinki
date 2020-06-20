import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setnewTitle] = useState('')
  const [newAuthor, setnewAuthor] = useState('')
  const [newUrl, setnewUrl] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)


  const handleTitleChange = (event) => {
    setnewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setnewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setnewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
      // id: blogs.length + 1,
    })
    setInfoMessage(`a new blog ${newTitle} added`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
    setnewTitle('')
    setnewAuthor('')
    setnewUrl('')
  }


  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm