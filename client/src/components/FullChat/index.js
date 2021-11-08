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

  useEffect(() => {
    setLoading(true);

    setMessages(chats.messages);
    setLoading(false);
  }, [chats]);

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
    const { name, room } = { name: currentUserParsed.name, room: user._id };
    socket = io(endPoint, { transports: ["websocket"] });
    setRoom(room);
    setName(name);
    console.log(name, room);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        // alert(error);
      }
    });
  }, [endPoint, user._id]);

  useEffect(() => {
    socket.on("gotMessage", (message, userId, timeStamp) => {
      console.log({ message, userId, timeStamp });
      setMessages((messages) => [
        ...messages,
        {
          value: message,
          time: Date(timeStamp).toLocaleString(),
          sentBy: userId,
        },
      ]);
    });
  }, [user]);

  useEffect(() => {
    setMessages("");
    const message = [
      {
        sentBy: currentUserParsed.name,
        time: current.toLocaleString(),
        value: user.name + ", Welcome " + user._id,
      },
    ];
    setMessages((messages) => [...messages, message]);
    // if (existingMessages == null) localStorage.setItem(user._id, JSON.stringify(message));
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

    if (message) {
      socket.emit("sendMessage", message, user._id, currentUserParsed._id);
    }
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
