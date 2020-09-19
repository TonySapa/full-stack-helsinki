import React from "react"
import Blog from "./Blog"
import blogService from "../services/blogs"
import LoggedInHeader from "../components/LoggedInHeader"
import { Col, Row } from 'antd';


const LoggedInView = ({ user, blogs }) => {

  return (
    <div>
      <LoggedInHeader />
      <Row style={{margin: '20px'}} gutter={16,16}>
        <h2>Blogs</h2>
      </Row>
      <Row style={{margin: '20px'}} gutter={16,16}>
        {blogs
          .sort((a, b) => b.votesCount - a.votesCount)
          .map((blog) => (
            <Col span={8}>
              <Blog
                key={blog.id}
                blog={blog}
                loggedInUser={user}
                blogs={blogs}
                voteClickHandler={blogService.voteClickHandler}
              />
            </Col>
          ))}
      </Row>


    </div>
  );
};

export default LoggedInView;
