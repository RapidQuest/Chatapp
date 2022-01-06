import ImageWithLoading from "../../ImageWithLoading";
import React, { useEffect} from "react";
const apiUrl = "http://localhost:5000";

export default function ImageContainer({setMessagesLoaded, message, id, getFormatedTime, user }) {
  useEffect(() => {
    if(user.lastMessage.value === message.value){
      console.log("message loaded");
      setMessagesLoaded(true);
    }
  }, [message])
  return message.sentBy === id ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{getFormatedTime(message.time)}</p>
      <div className="message-image-container backgroundLight">
        <ImageWithLoading src={apiUrl + message.value} className="messageText colorDark" />
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="message-image-container backgroundLight">
        <ImageWithLoading src={apiUrl + message.value} className="messageText colorDark" />
      </div>
      <p className="sentText pl-10 ">{getFormatedTime(message.time)}</p>
    </div>
  );
}
