import TextContainer from "./TextContainer";
import ImageContainer from "./ImageContainer";

import "./style.css";

const Message = ({ message, id, showFullScreenImage }) => {
  function getTimeZone() {
    let timezone = localStorage.getItem("timezone");
    if (timezone == null) {
      timezone = "America/New_York";
    }
    return timezone;
  }

  function getFormatedTime(timeString) {
    const timeStanmp = new Date(timeString).getTime();
    if (isNaN(timeStanmp)) return;

    const options = {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: getTimeZone(),
    };
    return new Date(timeStanmp * 1000).toLocaleString("en-US", options);
  }

  return message ? (
    message.type !== "string" ? (
      <ImageContainer
        showFullScreenImage={showFullScreenImage}
        message={message}
        id={id}
        getFormatedTime={getFormatedTime}
      />
    ) : (
      <TextContainer message={message} id={id} getFormatedTime={getFormatedTime} />
    )
  ) : (
    <div>Start A new Conversation</div>
  );
};
export default Message;
