import React from "react";

function UpdateNotification({ confirmation: { text } }) {
  return text ? (
    <div>{text}</div>
  ) : null;
}

export default UpdateNotification;