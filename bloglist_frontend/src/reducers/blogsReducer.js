import blogsService from "../services/blogs";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "BLOGS_INIT":
      return action.data.responseData;
    case "BLOGS_ADD":
      return state.concat(action.data);
    case "BLOGS_VOTE":
      return state
        .filter((blog) => blog.id !== action.data.id) // the other blogs
        .concat(action.data); // + the updated blog
    case "BLOGS_REMOVE":
      return state.filter((blog) => blog.id !== action.data.blogID);
    default:
      return state;
  }
};

/**
 * Action creator for async action **for initializing blogs to UI**.
 */
export const blogsInitAction = () => async (dispatch) => {
  const responseData = await blogsService.getAll();
  dispatch({
    type: "BLOGS_INIT",
    data: { responseData }
  })
};

/**
 * Action creator for async action **for submitting a new blog**.
 * @param {Object} blogInputs an object containing the fields needed for a new blog
 */
export const blogsAddAction = (blogInputs) => async (dispatch) => {
  const { data } = await blogsService.postBlog(blogInputs);
  dispatch({
    type: "BLOGS_ADD",
    data: data
  });
};

/**
 * Action creator for async action **for removing a blog**.
 * @param blogID of the blog to remove
 */
export const blogsRemoveAction = (blogID) => async (dispatch) => {
  await blogsService.removeBlog(blogID);
  dispatch({
    type: "BLOGS_REMOVE",
    data: { blogID }
  });
}

/**
 * Action creator for async action **for voting a blog**, i.e. increasing field votesCount
 * value by 1 and submitting that to be update.
 * @param blogID of the blog whose votesCount to increase by 1
 */
export const blogsVoteAction = (blogID) => async (dispatch, getState) => {
  const oldVotes = getState().blogs.find((blog) => blog.id === blogID).likes;
  const responseData = await blogsService.updateBlog({ likes: oldVotes + 1 }, blogID);
  dispatch({
    type: "BLOGS_VOTE",
    data: responseData
  });
};

export default reducer;