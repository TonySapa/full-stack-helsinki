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
  <p><b>Number of exercises {numEx}</b></p>
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

export default Course