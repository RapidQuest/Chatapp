import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

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

  useEffect(() => {
    setLoading(true);

    setMessages(chats ? chats.messages : null);
    // console.log( chats);
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
        // console.log(json);
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

    socket.emit("sendMessage", message, currentUserParsed._id, chats.chatid);
    setLastMessages((lastMessages) => {
      lastMessages.forEach((lastMessage) => {
        if (lastMessage.userId == user._id) {
          lastMessage.lastMessage = message;
        }
      });

      return lastMessages;
    });
    
    //here is the problem for displaying multiple messages
    setAllChats((chat) => {
      //Cloning chat obj
      const newChat = chat;
      newChat &&
        newChat.forEach((c, i) => {
          if (c && c.chatid === chats.chatid) {
            c.messages.push({
              value: message,
              sentBy: currentUserParsed._id,
              time: Date.now(),
            });
            console.log(c);
          }
        });

      return newChat;
    });

    saveMessage({
      value: message,
      time: Date.now(),
      sentBy: currentUserParsed._id,
    });
    setMessage("");

  };

  return (
    <div className="outerContainer">
      <div className="containerC" id={user._id}>
        <InfoBar user={user} setSelectedUser={setSelectedUser} />
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
