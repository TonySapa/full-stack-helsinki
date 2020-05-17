import React from "react";

function Notification({ confirmation: { text } }) {
  return text ? (
    <div>{text}</div>
  ) : null;
}

export default Notification;