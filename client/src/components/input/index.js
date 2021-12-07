import React from "react";

import "./style.css";

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form send-message-wrapper">
    <div className="input-group">
      <input
        className="input form-control shadow-none"
        type="text"
        placeholder="Write a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
      />
      <span className="input-group-append">
        <div className="input-group-text attachIcon bg-transparent border-left-0 rounded-0 h-100">
            <input id="files" className="hidden" type="file" />
            <label for="files"><i className="fas fa-paperclip"></i></label>
        </div>
      </span>
    </div>
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
