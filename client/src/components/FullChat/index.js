import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import InfoBar from "../InfoBar";
import Input from "../Input";
import Messages from "../Messages";
import "./style.css";

const apiUrl = "http://localhost:5000/";
const socket = io(apiUrl, { transports: ["websocket"] });

export default function FullChat({ user, setSelectedUser, chats, setAllChats }) {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserParsed = JSON.parse(currentUser);
  // let existingMessages = JSON.parse(localStorage.getItem(user._id));

  useEffect(() => {
    setLoading(true);

    setMessages(chats ? chats.messages : null);
    setLoading(false);
  }, [chats]);

  const saveMessage = async (message) => {
    const data = {
      chatId: chats.chatid,
      message: message,
      userId: currentUserParsed._id,
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

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.error("Failed to log out");
    }
  }

  const sendMessage = (message, event) => {
    event && event.preventDefault();
    if (!message) return;

    const messageId = uuidv4();
    const time = Date.now();

    // Sending event to socketio
    socket.emit(
      "sendMessage",
      message.value,
      currentUserParsed._id,
      chats.chatid,
      messageId,
      message.type,
      message.fileName
    );

    const tempObj = {
      value: message.value,
      sentBy: currentUserParsed._id,
      time,
      id: messageId,
      type: message.type,
    };

    if (message.fileName) {
      tempObj.fileName = message.fileName;
    }
    // Adding to all chats array
    setAllChats((chat) => {
      //Cloning chat obj
      const newChat = JSON.parse(JSON.stringify(chat));
      newChat &&
        newChat.forEach((c, i) => {
          if (c && c.chatid == chats.chatid) {
            c.messages.push(tempObj);
          }
        });

      return newChat;
    });

    // Saving to mongodb
    saveMessage(tempObj);

    // Clear message feild
    setMessage("");
  };

  return (
    <div className="outerContainer">
      <div className="containerC" id={user._id}>
        <InfoBar user={user} setSelectedUser={setSelectedUser} />
        {loading ? (
          <div className="loader"></div>
        ) : (
          <Messages user={user} messages={messages} id={currentUserParsed._id} />
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
