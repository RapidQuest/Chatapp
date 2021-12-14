import React, { useState } from "react";
import axios from "axios";

import "./style.css";

const apiUrl = "http://localhost:5000/";

const Input = ({ message, setMessage, sendMessage }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!file) {
      sendMessage(message, "string", event);
      return;
    }

    const fileType = file.type;
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(apiUrl + "file/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const data = res.data;
        const filePath = data.filePath;

        sendMessage(filePath, fileType, event);
        setFile(null);
      });
  };

  return (
    <form className="form send-message-wrapper">
      {file ? (
        <div className="input-group">
          <input
            id="file-name"
            className="input form-control shadow-none text-center"
            disabled
            type="text"
            value={file?.name}
          />
        </div>
      ) : (
        <div className="input-group">
          <input
            className="input form-control shadow-none"
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(message, "string", event) : null
            }
          />

          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="file-input"
            accept="image/png, image/jpeg"
          />
          <label
            className="input-group-text attachIcon bg-transparent border-left-0 rounded-0 h-100"
            id="file-input-label"
            htmlFor="file-input"
          >
            <i className="fas fa-paperclip"></i>
          </label>
        </div>
      )}
      <button className="sendButton" onClick={handleSendMessage}>
        Send
      </button>
    </form>
  );
};

export default Input;
