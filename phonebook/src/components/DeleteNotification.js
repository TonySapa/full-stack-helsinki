import React from "react";

function DeleteNotification({ confirmation: { text } }) {
  return text ? (
    <div>{text}</div>
  ) : null;
}

export default DeleteNotification;