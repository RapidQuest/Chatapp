import React, { useEffect, useRef } from "react";

import Message from "../Message";

import "./style.css";

const Messages = ({ messages, id }) => {
  const messagesContainerRef = useRef(null);

  const scrollToBottom = (ele) => {
    if (!ele) return;
    ele.scrollTop = ele.scrollHeight - ele.clientHeight;
  };

  useEffect(() => {
    scrollToBottom(messagesContainerRef.current);
  }, [messages]);

  return (
    <>
      {messages ? (
        <div ref={messagesContainerRef} className="messages">
          {messages.map((message, i) => (
            <div key={message.id || i}>
              <Message message={message} id={id} />
            </div>
          ))}
        </div>
      ) : (
        <div>start a new conversation</div>
      )}
    </>
  );
};

export default Messages;
