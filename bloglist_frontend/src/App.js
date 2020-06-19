import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setnewTitle] = useState('')
  const [newAuthor, setnewAuthor] = useState('')
  const [newUrl, setnewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      // id: blogs.length + 1,
    }
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setnewTitle('')
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken('')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleTitleChange = (event) => {
    setnewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setnewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setnewUrl(event.target.value)
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>    
  )

  const logOut = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const blogForm = () => (
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

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h1>blogs</h1>
          <p>
            {user.name} logged in
            {logOut()}
          </p>
          {blogForm()}
          {blogs.map((blog, i) => 
            <Blog
              key={i}
              blog={blog} 
            />
          )}
        </div>
      }
    </div>
  )
}

export default App 