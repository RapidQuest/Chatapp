import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import InfoBar from "../InfoBar";
import Input from "../Input";
import Messages from "../Messages";
import "./style.css";
let socket;

export default function FullChat({ user, setSelectedUser, chats, setLastMessages }) {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserParsed = JSON.parse(currentUser);
  const apiUrl = "http://localhost:5000/";
  const current = new Date();
  // let existingMessages = JSON.parse(localStorage.getItem(user._id));

  useEffect(() => {
    setLoading(true);

    setMessages(chats ? chats.messages : null);
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

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.error("Failed to log out");
    }
  }

  useEffect(() => {
    socket = io(apiUrl, { transports: ["websocket"] });
    chats && socket.emit("join", chats.chatid);
    socket.on("messageRecived", (message, userId, timeStamp, messageId) => {
      console.log("%cmessage recived", "color:red");

      setMessages((messages) => [
        ...messages,
        {
          value: message,
          time: Date(timeStamp).toLocaleString(),
          sentBy: userId,
          messageId,
        },
      ]);

      setLastMessages((lastMessages) => {
        lastMessages.forEach((lastMessage) => {
          if (lastMessage.userId == userId) {
            lastMessage.lastMessage = message;
          }
        });

        console.log({ lastMessages, currentUserParsed: userId });
        return lastMessages;
      });
    });
  }, [user]);

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

    setMessages((messages) => [
      ...messages,
      { value: message, time: current.toLocaleString(), sentBy: currentUserParsed._id },
    ]);

    saveMessage({ value: message, time: current.toLocaleString(), sentBy: currentUserParsed._id });
    setMessage("");

    // localStorage.setItem(user._id, JSON.stringify(existingMessages));
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
