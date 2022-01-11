import React, { useEffect} from "react";
import { Modal } from "react-bootstrap";
export default function CallModal({show, handleClose, stream, myVideo, callAccepted, callEnded, userVideo}) {

  return (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
      
    </Modal.Body>
    <Modal.Footer>
      <button variant="secondary">Close Modal</button>
    </Modal.Footer>
  </Modal>
  );
}
