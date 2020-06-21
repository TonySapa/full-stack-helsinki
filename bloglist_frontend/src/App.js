import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import InfoAlert from './components/InfoAlert'
import DangerAlert from './components/DangerAlert'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [dangerMessage, setDangerMessage] = useState(null)

  function compareNumbers(a, b) {
    return b.likes - a.likes
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs.sort(compareNumbers))
      })
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        initialBlogs.map(blog => {
          setUsers(users.concat(blog.user))
        })})
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setDangerMessage('wrong username or password')
      setTimeout(() => {
        setDangerMessage(null)
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

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <DangerAlert message={dangerMessage} />
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setInfoMessage(
          `a new blog ${blogObject.title} added`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      })
  }

  const eraseBlog = (title, id) => {
    if (window.confirm(`Delete ${title}?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== id))
          setInfoMessage(
            `${title} has been successfully removed`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        })
        .catch(() => {
          setBlogs(blogs.filter((b) => b.id !== id))
          setDangerMessage(
            `Information of ${title} has already been removed from server`
          )
          setTimeout(() => {
            setDangerMessage(null)
          }, 5000)
        })
    }
  }

  const addLike = async (id, blogObject) => {
    blogService
      .update(id, blogObject)
    blogService
      .getAll()
      .then(returnedBlogs => {
        setBlogs(returnedBlogs.sort(compareNumbers))
      })

  }

  const logOut = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='new note' buttonLabel2='cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const getBlogUser = (blog) => {
    return (blog.user) ? blog.user.name : ' '
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <InfoAlert message={infoMessage} />
          <h1>blogs</h1>
          <p>
            {user.name} logged in
            {logOut()}
          </p>
          {blogForm()}
          {blogs.map((blog, i) =>
            <Blog
              sessionUser={user.name}
              key={i}
              blog={blog}
              id={blog.id}
              user={getBlogUser(blog)}
              updateBlog={addLike}
              eraseBlog={eraseBlog}
              title={blog.title}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App