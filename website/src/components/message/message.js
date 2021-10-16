import React from 'react';

import './message.css';


const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  // const trimmedName = name.trim().toLowerCase();

  if(user === name) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">12/09 1:00 PM</p>
          <div className="messageBox backgroundLight2">
            <p className="messageText colorDark">{text}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-10 ">12/09 1:00 PM</p>
          </div>
        )
  );
}

export default Message;