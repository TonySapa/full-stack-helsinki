import React, { useState } from "react";
import BlogComment from './BlogComment'
import blogService from '../services/blogs'
import { useDispatch } from "react-redux";
import { blogsVoteAction } from "../reducers/blogsReducer";
import { notificAction } from "../reducers/notificationReducer";
import { commentsAddAction } from "../reducers/commentsReducer";
import { Avatar, Col, Descriptions, Input, PageHeader, Row } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'



const SingleBlog = (props) => {
  const [blog, setBlog] = useState({})
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  blogService.getById(props.match.params.id)
    .then(blog => setBlog(blog))

  const handleCommentChange = (event) => {
    console.log(event.target.value)
    setComment(event.target.value)
  }
  const { TextArea } = Input;

  return (
    <>
      <NavLink to={'/blogs'}>
        <PageHeader
          className="site-page-header"
          onBack={() => console.log(`back()`)}
          title={blog.title}
          subTitle={`by ${blog.author}`}
        />
      </NavLink>

      <Row style={{margin: '30px'}} gutter={16,16}>
        <Col span={12}>
          <Descriptions title={'Blog information'}>
            <Descriptions.Item label="Title">{blog.title}</Descriptions.Item>
            <Descriptions.Item label="Author">{blog.author}</Descriptions.Item>
            <br/>
            <Descriptions.Item label="URL"><a href={blog.url} target='_blank'>{blog.url}</a></Descriptions.Item>
            <Descriptions.Item label="Likes">{blog.likes} likes <LikeOutlined id="voteButton" type="button" onClick={() => dispatch(blogsVoteAction(blog.id))} /></Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <h2>Comments</h2>
          <form 
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(commentsAddAction(comment, blog))
            .then( // show notification for success or failure of submitting a blog
              () => {
                dispatch(notificAction({ type: "success", message: `submitted comment "${comment}"`}, 3));
                setComment(''); // clear input fields
              },
              (error) => {
                dispatch(notificAction({ type: "failure", message: `${error.response.data.error} (${error.response.status})`}, 5));
              }
            );
          }}>
            <Row>
              <Col span={2}>
              <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              </Col>
              <Col span={22}>
                <TextArea value={comment} onChange={handleCommentChange} rows={4} />
              </Col>
            </Row><br/>
            <Row>
              <Col span={2}>
              </Col>
              <Col>
                <button type='submit' className='ant-btn ant-btn-primary'>Add Comment</button>
              </Col>
            </Row>
          </form>
          {
            blog.comments
            ? blog.comments.map(c => <BlogComment comment={c}/>)
            : null
          }
        </Col>
      </Row>
    </>
  )
}
export default SingleBlog;
