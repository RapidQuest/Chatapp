export default function TextContainer({ message, id, getFormatedTime }) {
  return message.sentBy === id ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{getFormatedTime(message.time)}</p>
      <div className="messageBox backgroundLight2">
        <p className="messageText colorDark">{message.value}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message.value}</p>
      </div>
      <p className="sentText pl-10 ">{getFormatedTime(message.time)}</p>
    </div>
  );
}
