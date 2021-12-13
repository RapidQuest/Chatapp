const apiUrl = "http://localhost:5000";

export default function ImageContainer({ message, id, getFormatedTime }) {
  return message.sentBy === id ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{getFormatedTime(message.time)}</p>
      <div className="message-image-container backgroundLight">
        <img src={apiUrl + message.value} className="messageText colorDark" />
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="message-image-container backgroundLight">
        <img src={apiUrl + message.value} className="messageText colorDark" />
      </div>
      <p className="sentText pl-10 ">{getFormatedTime(message.time)}</p>
    </div>
  );
}
