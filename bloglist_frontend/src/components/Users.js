import React from "react";
import LoggedInHeader from "../components/LoggedInHeader";
import { groupBlogsByUsers } from "../utils/dataAnalyzer";
import { Link } from "react-router-dom";

/**
 * Construct table rows and data cells of `userStats`.
 * @param userStats an object containing blogs organized by submitter
 * (this object can be constructed with `groupBlogsByUsers()`)
 */
const constructTableData = (userStats) => {
  // initialize an array of `tr`s, i.e. table rows, with dummy data's information...
  let userData = userStats["dummy data"]
    ? [(
      <tr key="dummy data">
        <td><em>dummy data</em></td>
        <td><em>{userStats["dummy data"].length}</em></td>
      </tr>
    )]
    : []; // ...unless there isn't any

  // append a row for each submitting user to the array of table rows
  for (const user in userStats["user submitted data"]) {
    let submitter = userStats["user submitted data"][user][0].user;
    userData = userData.concat(
      <tr key={submitter.id}>
        <td><Link to={`/users/${submitter.id}`}>{submitter.name}</Link></td>
        <td>{userStats["user submitted data"][user].length}</td>
      </tr>
    );
  }

  return userData;
}

// this component's purpose: exercise 7.13
const Users = (props) => {
  let userStats;
  if (props.blogs.length > 0) userStats = groupBlogsByUsers(props.blogs);

  return (
    <div>
      {props.user && <LoggedInHeader /> /* during the first two renders props don't yet have proper values*/}

      <h3>Users</h3>
      <table style={{ textAlign: "left" }}>
        <thead><tr><th>user</th><th>blogs created</th></tr></thead>
        <tbody>
          {userStats
            ? constructTableData(userStats)
            : <tr><td>...</td><td>...</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
