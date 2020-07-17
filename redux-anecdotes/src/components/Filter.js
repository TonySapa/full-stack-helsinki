import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const style = {
    marginTop: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filter' onChange={handleChange} />
    </div>
  )
};

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default connect(null, { setFilter })(Filter);