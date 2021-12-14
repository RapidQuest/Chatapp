import React, { useEffect, useRef, useState } from "react";
import FullScreenImage from "../FullScreenImage";
import Message from "../Message";

import "./style.css";

const Messages = ({ messages, id, user }) => {
  const [fullScreenImg, setFullScreenImg] = useState({});
  const messagesContainerRef = useRef(null);

  const scrollToBottom = (ele) => {
    if (!ele) return;
    ele.scrollTop = ele.scrollHeight - ele.clientHeight;
  };

  const showFullScreenImage = (src) => {
    setFullScreenImg(src);
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
              <Message showFullScreenImage={showFullScreenImage} message={message} id={id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">start a new conversation</div>
      )}
      {fullScreenImg && fullScreenImg.src ? (
        <FullScreenImage
          user={user}
          setFullScreenImg={setFullScreenImg}
          fullScreenImg={fullScreenImg}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Messages;
