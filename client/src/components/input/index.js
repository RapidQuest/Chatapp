import React from "react";

import "./style.css";

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form send-message-wrapper">
  <div class="input-group">
    <input
      className="input form-control shadow-none"
      type="text"
      placeholder="Write a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
    />
      <span class="input-group-append">
          <span class="input-group-text attachIcon bg-transparent border-left-0 rounded-0 h-100">
              <i class="fas fa-paperclip"></i>
          </span>
      </span>
  </div>
  {/* <div className="input-group px-3 pt-3 mb-3">
    <input
      className="input form-control shadow-none"
      type="text"
      placeholder="Write a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
    />
    <div className="input-group-prepend">
      <span className="input-group-text bg-white rounded-0 h-100" id="basic-addon1">
        <i className="fas fa-paperclip"></i>
      </span>
    </div>
  </div>
    <input
      className="input form-control shadow-none"
      type="text"
      placeholder="Write a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
    />
    <i class="fas fa-paperclip"></i> */}
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
