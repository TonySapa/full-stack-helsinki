import React from "react";

const Notification = ({ notification }) => {
  const { type, message } = notification;

  return (
    // CSS class defined in App.css
    <div className={type}>
      {message}
    </div>
  );
};

export default Notification;
