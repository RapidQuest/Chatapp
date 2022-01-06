import TextContainer from "./TextContainer";
import ImageContainer from "./ImageContainer";
import React, { useEffect } from "react";

import "./style.css";

const Message = ({messagesLoaded, setMessagesLoaded, message, id,user,foundedMessageIndex }) => {

  useEffect(() => {
    if(messagesLoaded && foundedMessageIndex !== null){
      console.log("message found");
      setTimeout(() => {
        var elmnt = document.getElementById(user?.foundedMessage[foundedMessageIndex]?.id);
        elmnt.scrollIntoView({ behavior: 'smooth', block: 'end'});
        document.getElementById(elmnt.id).classList.add("highlight");
        setTimeout(function () {
           document.getElementById(elmnt.id).classList.remove('highlight');
        }, 2000); 
      }, 100)
    }
  }, [messagesLoaded, user, foundedMessageIndex])


  function getTimeZone() {
    let timezone = localStorage.getItem("timezone");
    if (timezone === null) {
      timezone = "Asia/Jakarta";
    }
    return timezone;
  }

  function getFormatedTime(timeString) {
    const timeStamp = new Date(timeString).getTime();
    if (isNaN(timeStamp)) return;

    const options = {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: getTimeZone(),
    };
    return new Date(timeStamp).toLocaleString("en-IN", options);
  }
  return message ? (
    message.type !== "string" ? (
      <ImageContainer setMessagesLoaded={setMessagesLoaded} message={message} id={id} getFormatedTime={getFormatedTime} user={user}  />
    ) : (
      <TextContainer setMessagesLoaded={setMessagesLoaded} message={message} id={id} getFormatedTime={getFormatedTime} user={user} />
    )
  ) : (
    <div>Start A new Conversation</div>
  );
};
export default Message;
