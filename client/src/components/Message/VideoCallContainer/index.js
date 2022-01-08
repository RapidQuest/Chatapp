import React, { useEffect} from "react";
export default function VideoCallContainer({setMessagesLoaded, message, id, getFormatedTime, user }) {
  useEffect(() => {
    if(user.lastMessage.value === message.value){
      setMessagesLoaded(true);
    }
  }, [message, user])

  return message.sentBy === id ? (
    <div className="messageContainer justifyEnd" id={message.id}>
      <p className="sentText pr-10">{getFormatedTime(message.time)}</p>
      <div className="messageBox backgroundLight2">
        <p className="messageText darkText colorDark">{message.value}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart" id={message.id}>
      <div className="messageBox backgroundLight">
        <p className="messageText darkText colorDark">{message.value}</p>
      </div>
      <p className="sentText pl-10 ">{getFormatedTime(message.time)}</p>
    </div>
  );
}
