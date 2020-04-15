import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  /* 1.3
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14*/

  /* 1.4
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }*/
  /* 1.5
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  */


  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
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
        <Part topic={course.parts[0].name} exercise={course.parts[0].exercises} />
        <Part topic={course.parts[1].name} exercise={course.parts[1].exercises} />
        <Part topic={course.parts[2].name} exercise={course.parts[2].exercises} />
      </>
    )
  }
  
  const Total = () => {
    return (
      <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content />
      <Total />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))