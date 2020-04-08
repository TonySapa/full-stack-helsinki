import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const course = 'Half Stack application development'
  /*const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14*/



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
        <Part topic={part1.name} exercise={part1.exercises} />
        <Part topic={part2.name} exercise={part2.exercises} />
        <Part topic={part3.name} exercise={part3.exercises} />
      </>
    )
  }
  
  const Total = () => {
    return (
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    )
  }


  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))