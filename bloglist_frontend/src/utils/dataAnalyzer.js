import { groupBy } from "lodash";

/**
 * Group blogs data by submitting users.
 * @param blogs as presented in Redux state
 * @returns an object containing blogs organized by submitter
 */
export const groupBlogsByUsers = (blogs) => {
  // separate dummy data from user submitted data
  let userStats = groupBy(blogs, "user");
  for (let [key, value] of Object.entries(userStats)) {
    if (key === "null") userStats["dummy data"] = value;
    else userStats["user submitted data"] = value;
    delete userStats[key];
  };

  // group user submitted data by submitter
  let userSubmittedData = groupBy(userStats["user submitted data"], "user.id");
  delete userStats["user submitted data"];
  userStats["user submitted data"] = userSubmittedData;

  return userStats;
};

/**
 * 
 * @param blogs as presented in Redux state
 * @param {String} submitterID submitting user's full name
 * @returns an array containing the submitted blogs by the user
 */
export const getSubmittersBlogs = (blogs, submitterID) => {
  return groupBlogsByUsers(blogs)["user submitted data"][submitterID];
}
