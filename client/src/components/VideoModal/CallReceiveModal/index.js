import React, { useEffect} from "react";
import { Modal } from "react-bootstrap";
export default function CallReceiveModal({receivingCall, handleClose, stream, myVideo, callAccepted, callEnded, userVideo, answerCall}) {

  return (
  <Modal show={receivingCall} onHide={handleClose}>
    <Modal.Header closeButton>
      {/* <Modal.Title>Login Form</Modal.Title> */}
    </Modal.Header>
    <Modal.Body>
      <div className="video-container">
        <div className="video">
          {stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "400px" }} />}
        </div>
        <div className="video">
          {callAccepted && !callEnded ?
          <video playsInline ref={userVideo} autoPlay style={{ width: "600px"}} />:
          null}
        </div>
      </div>
      <div className="" onClick={answerCall}>Receive Call</div>
    </Modal.Body>
    {/* <Modal.Footer>
      <button variant="secondary">Close Modal</button>
    </Modal.Footer> */}
  </Modal>
  );
}
