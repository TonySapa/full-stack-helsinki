import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (gibberish) => {
  token = `Bearer ${gibberish}`;
};

const postBlog = async (newBlogObject) => {
  const reqConfig = { headers: { Authorization: token } };
  const postResponse = await axios.post(baseUrl, newBlogObject, reqConfig);
  return postResponse;
};

/**
 * Note to exercise 5.8*: Due to the implementation of my own back end
 * there is no need attach every field to the PUT request. Back end
 * will check which fields have values defined in the request body and
 * take them. The rest of the fields will be replaced in the back end
 * with the values fetched from the database; they don't need to be sent
 * from the front end.
 * @param updateData e. g. votesCount, note: not all fields are required
 * @returns updated blog
 */
const updateBlog = async (updateData, blogID) => {
  const updateResponse = await axios.put(`${baseUrl}/${blogID}`, updateData);
  return updateResponse.data;
};

/**
 * Only allowed for logged in submitter.
 */
const removeBlog = async (blogID) => {
  const reqConfig = { headers: { Authorization: token } };
  const removeResponse = await axios.delete(`${baseUrl}/${blogID}`, reqConfig);
  return removeResponse;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};


export default {
  getAll, getById, setToken, postBlog, updateBlog, removeBlog
};
