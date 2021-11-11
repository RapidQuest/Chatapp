import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import InfoBar from "../InfoBar";
import Input from "../Input";
import Messages from "../Messages";
import "./style.css";

let socket;

export default function FullChat({ user, setSelectedUser, chats }) {
  const { currentUser, logout, storeProfileInfo } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserParsed = JSON.parse(currentUser);
  const endPoint = "localhost:5000";
  const apiUrl = "http://localhost:5000/";
  // let existingMessages = JSON.parse(localStorage.getItem(user._id));
  var current = new Date();
  console.log(chats);
  useEffect(() => {
    setLoading(true);

    setMessages(chats.messages);
    setLoading(false);
  }, [chats]);

  const saveMessage = async (message) => {
    const data = {
      id: chats.chatid,
      message: message,
    };
    await fetch(apiUrl + "users/updateChat", {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch(function (json) {});
  };

  // useEffect(() => {
  //   setAllMessages((messages) => [...messages, messages]);
  // }, [message]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  console.log(chats.messages);
  useEffect(() => {
    socket = io(apiUrl, { transports: ["websocket"] });

    socket.on("messageRecived", (message, userId, timeStamp) => {
      console.log({ message, userId, timeStamp });
      console.log(messages);
      setMessages((messages) => [
        ...messages,
        {
          value: message,
          time: Date(timeStamp).toLocaleString(),
          sentBy: userId,
        },
      ]);
      console.log(messages);

      // return () => {
      //   socket.off("messageRecived")
      // }
    });
  }, [user]);

  useEffect(() => {
    console.log("messgaes got updates");
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    // if(message) return;

    socket.emit("sendMessage", message, currentUserParsed._id, chats.chatid);

    setMessages((messages) => [
      ...messages,
      { value: message, time: current.toLocaleString(), sentBy: currentUserParsed._id },
    ]);

    saveMessage({ value: message, time: current.toLocaleString(), sentBy: currentUserParsed._id });
    setMessage("");
    // if (existingMessages == null) {
    //   existingMessages = [];
    //   localStorage.setItem(user._id, JSON.stringify(messages));
    // }

    // existingMessages.push({
    //   value: message,
    //   time: current.toLocaleString(),
    //   sentBy: currentUserParsed.id,
    // });

    // localStorage.setItem(user._id, JSON.stringify(existingMessages));
  };

  return (
    <div className="outerContainer">
      <div className="containerC" id={user._id}>
        <InfoBar user={user} room={room} setSelectedUser={setSelectedUser} />
        {loading ? (
          <div class="loader"></div>
        ) : (
          <Messages messages={messages} id={currentUserParsed._id} />
        )}
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
