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

export default function FullChat({ user, setSelectedUser, chats, setLastMessages, setAllChats }) {
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

  const sendMessage = (event) => {
    event.preventDefault();

    const messageId = uuidv4();
    socket.emit("sendMessage", message, currentUserParsed._id, chats.chatid, messageId);
    setLastMessages((lastMessages) => {
      lastMessages.forEach((lastMessage) => {
        if (lastMessage.userId == user._id) {
          lastMessage.value = message;
          lastMessage.chatId = chats.chatid;
        }
      });

      return lastMessages;
    });

    setAllChats((chat) => {
      //Cloning chat obj
      const newChat = JSON.parse(JSON.stringify(chat));
      newChat &&
        newChat.forEach((c, i) => {
          if (c && c.chatid == chats.chatid) {
            c.messages.push({
              value: message,
              sentBy: currentUserParsed._id,
              time: Date.now(),
              id: messageId,
            });
          }
        });

      return newChat;
    });
    saveMessage({
      value: message,
      sentBy: currentUserParsed._id,
      time: Date.now(),
      id: messageId,
    });
    setMessage("");

    // localStorage.setItem(user._id, JSON.stringify(existingMessages));
  };

  return (
    <div className="outerContainer">
      <div className="containerC" id={user._id}>
        <InfoBar user={user} setSelectedUser={setSelectedUser} />
        {chats && chats.chatid}
        {loading ? (
          <div className="loader"></div>
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
