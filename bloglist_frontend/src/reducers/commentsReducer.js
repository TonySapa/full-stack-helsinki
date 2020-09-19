import blogsService from "../services/blogs";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "COMMENTS_ADD":
      return state.concat(action.data);
    default:
      return state;
  }
};


export const commentsAddAction = (comment, blog) => async (dispatch) => {
  const { data } = await blogsService.updateBlog({comments: blog.comments.concat(comment)}, blog.id);
  dispatch({
    type: "BLOGS_ADD",
    data: data
  });
};

export default reducer