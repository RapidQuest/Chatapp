import React from "react";

import Message from "../Message";

import "./style.css";

const Messages = ({ messages, id }) => {
  return (<>
    {messages?
    <div className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} id={id} />
          {console.log(messages)}
        </div>
      ))}
    </div>
    : <div>start a new conversation</div>}
    </>
  );
};

export default Messages;