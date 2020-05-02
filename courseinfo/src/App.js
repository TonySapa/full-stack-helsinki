import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ modules }) => {
  var numEx = modules.reduce(function(sum, module) {
    return sum + module.exercises
  }, 0)
  return(
  <p>Number of exercises {numEx}</p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ modules }) => {
  return (
    <div>
      {modules.map(module =>
        <Part part={module} />
        )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content modules={course.parts} />
      <Total modules={course.parts} />
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App