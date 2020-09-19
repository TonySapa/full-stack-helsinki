import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef(({ children, toggleLabels }, ref) => {
  const [visible, setVisible] = useState(false);

  const { labelShow, labelHide } = toggleLabels;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // expose "toggleVisibility" to parent components
  useImperativeHandle(ref, () => toggleVisibility);

  return (
    <div>
      <div style={{ display: visible ? "none" : "" }}>
        <button id="toggleButton" type="button" onClick={toggleVisibility}>{labelShow}</button>
      </div>
      <div style={{ display: visible ? "" : "none" }} className="togglableContent">
        <button id="toggleButton" type="button" onClick={toggleVisibility}>{labelHide}</button>
        {children}
      </div>
    </div>
  );
});

Togglable.propTypes = {
  toggleLabels: PropTypes.shape({
    labelShow: PropTypes.string.isRequired,
    labelHide: PropTypes.string.isRequired
  }).isRequired
};

export default Togglable;
