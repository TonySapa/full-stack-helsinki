import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = (propsx) => {
    return (
      <h1>{propsx.courseTitle}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.topic} {props.exercise}</p>
    )
  }
  
  const Content = () => {
    return (
      <>
        <Part topic={part1} exercise={exercises1} />
        <Part topic={part2} exercise={exercises2} />
        <Part topic={part3} exercise={exercises3} />
      </>
    )
  }
  
  const Total = () => {
    return (
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    )
  }


  return (
    <div>
      <Header courseTitle={course} />
      <Content topic={part1} exercise={exercises1} topic2={part2} exercise2={exercises2} />
      <Total />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))