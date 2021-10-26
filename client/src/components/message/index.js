import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';


const Message = ({ message, id }) => {
  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false)
  useEffect(() =>{
    if(message.sentBy === id) {
      setIsSentByCurrentUser(true);
    }
  }, [message]);


  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">12/09 1:00 PM</p>
          <div className="messageBox backgroundLight2">
            <p className="messageText colorDark">{message.value} sent by {message.sentBy}</p>
          </div>
        </div>
        )
        : ( 
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{message.value}</p>
            </div>
            <p className="sentText pl-10 ">12/09 1:00 PM</p>
          </div>
        )
  );
}

export default Message;