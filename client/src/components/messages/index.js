import React, { useEffect, useRef, useState } from "react";

import Message from "../Message";

import "./style.css";

const Messages = ({ messages, id, user,foundedMessageIndex }) => {
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const messagesContainerRef = useRef(null);
  useEffect(() => {
    console.log(messagesLoaded);
  }, [messagesLoaded])
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
            <div key={i}>
              <Message foundedMessageIndex={foundedMessageIndex} messagesLoaded={messagesLoaded} setMessagesLoaded={setMessagesLoaded} message={message} id={id} user={user} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">start a new conversation</div>
      )}
    </>
  );
};

export default Messages;
