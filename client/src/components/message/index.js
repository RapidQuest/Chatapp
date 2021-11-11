import React from "react";
import { useState, useEffect } from "react";
import "./style.css";

const Message = ({ message, id }) => {
  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false);
  useEffect(() => {
    if (message.sentBy === id) {
      setIsSentByCurrentUser(true);
    }
  }, [message, id]);

  function getTimeZone() {
    let timezone = localStorage.getItem("timezone");
    if (timezone == null) {
      timezone = "America/New_York";
    }
    return timezone;
  }

  function getFormatedTime(timeString) {
    const timeStanmp = new Date(timeString).getTime();
    if (isNaN(timeStanmp)) return;

    const options = {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: getTimeZone(),
    };
    return new Date(timeStanmp * 1000).toLocaleString("en-US", options);
  }

  return message === undefined ? (
    <div>Start A new Conversation</div>
  ) : isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{getFormatedTime(message.time)}</p>
      <div className="messageBox backgroundLight2">
        <p className="messageText colorDark">{message.value}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message.value}</p>
      </div>
      <p className="sentText pl-10 ">{getFormatedTime(message.time)}</p>
    </div>
  );
};

export default Message;
