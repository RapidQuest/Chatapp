import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import InfoBar from "../InfoBar";
import Input from "../Input";
import Messages from "../Messages";
import "./style.css";

let socket;

export default function FullChat({ user, setSelectedUser }) {
  const { currentUser ,logout, storeProfileInfo } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const endPoint = "localhost:5000";
  let existingMessages = JSON.parse(localStorage.getItem(user._id));
  var current = new Date();
  console.log(JSON.parse(currentUser));

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    const { name, room } = { name: JSON.parse(currentUser).name, room: user._id };
    socket = io(endPoint, { transports: ["websocket"] });
    setRoom(room);
    setName(name);
    console.log(name, room);
    socket.emit("join", { name , room }, (error) => {
      if (error) {
        // alert(error);
      }
    });
  }, [endPoint, user._id]);

  //   useEffect(() => {
  //     socket.on('message', message => {
  //       setMessages(messages => [...messages,  {value: message, time: current.toLocaleString(), sentBy: JSON.parse(currentUser).id}]);
  //       if(existingMessages == null) localStorage.setItem(user._id, JSON.stringify(message));
        
  //     });
  // }, [user]);

  useEffect(() => {
    setMessages("");
    const message = [
      {
        sentBy: currentUser.name,
        time: current.toLocaleString(),
        value: user.name + ", Welcome " + user._id,
      },
    ];
    setMessages((messages) => [...messages, message]);
    if (existingMessages == null) localStorage.setItem(user._id, JSON.stringify(message));
  }, [user]);

  const sendMessage = (event) => {
    event.preventDefault();

    // if(message) {
    //   socket.emit('sendMessage', message, () => {

    //     setMessages(messages => [...messages, {value: message, time: current.toLocaleString(), sentBy: JSON.parse(currentUser).id}]);
    //     setMessage("")
    //     if(existingMessages == null){
    //       existingMessages = [];
    //       localStorage.setItem(user._id, JSON.stringify(messages));
    //     }
    //     console.log(messages);
    //     existingMessages.push({value: message, time: current.toLocaleString(), sentBy: JSON.parse(currentUser).id})

    //     localStorage.setItem(user._id, JSON.stringify(existingMessages))

    //   });
    // }

    setMessages((messages) => [
      ...messages,
      { value: message, time: current.toLocaleString(), sentBy: currentUser.id },
    ]);
    setMessage("");
    if (existingMessages == null) {
      existingMessages = [];
      localStorage.setItem(user._id, JSON.stringify(messages));
    }

    existingMessages.push({
      value: message,
      time: current.toLocaleString(),
      sentBy: currentUser.id,
    });

    localStorage.setItem(user._id, JSON.stringify(existingMessages));
    console.log(existingMessages);

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  user.messages = JSON.parse(localStorage.getItem(user._id));
  // console.log(user.messages);
  let allMessages = user.messages == null ? messages : user.messages;
  

  return (
      <div className="outerContainer">
        <div className="containerC" id={user._id}>
          <InfoBar user={user} room={room} setSelectedUser={setSelectedUser} />
          <Messages messages={allMessages} id={JSON.parse(currentUser).id} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        {/* <div className="text-center mt-2">
          <div className="btn" variant="link" onClick={handleLogout}>
          Log Out
        </div>
        </div> */}
      </div>
  );
}
