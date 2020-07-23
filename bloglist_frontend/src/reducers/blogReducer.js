import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    /*case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = { 
        ...blogToChange, 
        important: !blogToChange.important 
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )*/
    default:
      return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

/*export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}*/

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer