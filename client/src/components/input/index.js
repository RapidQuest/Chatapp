import React from "react";

import "./style.css";

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form send-message-wrapper">
    <input
      className="input form-control shadow-none"
      type="text"
      placeholder="Write a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
