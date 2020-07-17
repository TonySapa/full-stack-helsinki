import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    const filter = event.target.value
    props.setFilter(filter)
  }

  const style = {
    marginTop: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filter' onChange={handleChange} />
    </div>
  )
}

export default connect(
  null, 
  { setFilter }
)(Filter)