import ImageWithLoading from "../../ImageWithLoading";
const apiUrl = "http://localhost:5000";

export default function ImageContainer({ message, id, getFormatedTime, showFullScreenImage }) {
  const expandImage = (e) => {
    showFullScreenImage({
      src: apiUrl + message.value,
      type: message.type,
      fileName: message.fileName,
    });
  };

  return message.sentBy === id ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{getFormatedTime(message.time)}</p>
      <div onClick={expandImage} className="message-image-container backgroundLight">
        <ImageWithLoading src={apiUrl + message.value} className="messageText colorDark" />
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div onClick={expandImage} className="message-image-container backgroundLight">
        <ImageWithLoading src={apiUrl + message.value} className="messageText colorDark" />
      </div>
      <p className="sentText pl-10 ">{getFormatedTime(message.time)}</p>
    </div>
  );
}

// http://localhost:5000/file/17bc5485bb2d6565706c6918cc9233f6
