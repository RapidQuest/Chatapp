import React from 'react';
import { useState, useEffect } from 'react';
import './message.css';


const Message = ({ message, id }) => {
  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false)
  console.log(message);
  useEffect(() =>{
    if(message.user === 10) {
      setIsSentByCurrentUser(true);
    }
  }, [message]);


  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">12/09 1:00 PM</p>
          <div className="messageBox backgroundLight2">
            <p className="messageText colorDark">{message.text}</p>
          </div>
        </div>
        )
        : ( 
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{message.text}</p>
            </div>
            <p className="sentText pl-10 ">12/09 1:00 PM</p>
          </div>
        )
  );
}

export default Message;