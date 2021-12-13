import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";
import SideBar from "../SideBar";
import FullChat from "../FullChat";
import io from "socket.io-client";
import { getHash } from "../../utils";

import "./style.css";
import "./loader.css";

const Chat = () => {
  const unParseCurrentUser = useAuth().currentUser;
  const isSmall = useMediaQuery("(max-width: 760px)", false);

  const [allUsers, setAllUsers] = useState([]);
  const [allChats, setAllChats] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [lastMessages, setLastMessages] = useState([]);

  const [dataIsLoaded, setDataIsLoaded] = useState(true);
  const [chatLoad, setChatLoad] = useState(true);

  const [currentUser, setCurrentUser] = useState(JSON.parse(unParseCurrentUser));

  /**
   * Make stateRef always have the current selectedvalue.
   * Callbacks can refer to this object whenever they need the current value.
   * Note: the callbacks will not be reactive.
   * They will not re-run the instant state changes,
   * But they *will* see the current value whenever they do run
   */
  const selectedUserRef = useRef();
  selectedUserRef.current = selectedUser;

  const apiUrl = "http://localhost:5000/";

  let tagCount = 0;
  let tagClasses = {};

  const profileColor = (tagName) => {
    const tagColors = [
      "lightpink",
      "mustdo",
      "agenda",
      "someday",
      "purple",
      "bronze",
      "aqua",
      "grey",
      "silver",
      "brown",
      "cranberry",
      "orange",
      "brightorange",
      "peach",
      "maringold",
      "lightgreen",
      "darkgreen",
      "teal",
      "lightblue",
      "darkblue",
      "lavender",
      "plum",
      "lightgray",
      "darkgray",
    ];
    if (tagClasses[tagName]) {
      return tagClasses[tagName];
    }
    tagClasses[tagName] = tagColors[tagCount];
    tagCount++;
    if (tagCount > tagColors.length) {
      tagCount = 0;
    }
    return tagClasses[tagName];
  };

  const getAllUsers = () => {
    setDataIsLoaded(true);
    fetch(apiUrl + "users/getUsers")
      .then((res) => res.json())
      .then((users) => {
        users.forEach((user) => {
          user.color = profileColor(user._id);
        });

        setAllUsers(users);
        setDataIsLoaded(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateUser = (data) => {
    fetch(apiUrl + "users/updateUser", {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      if (response.status === 200) {
      } else {
        return response.json().then((json) => {
          throw new Error(json.msg);
        });
      }
    });
  };

  const pushChatIdToUsers = (user, id) => {
    fetch(apiUrl + "chats/getUser", {
      method: "get",
      headers: {
        id: user._id,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          console.error("no user found");
        } else {
          data.chatId.push(id);
          updateUser(data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const createChat = (id, user) => {
    const chat = {
      chatid: id,
      userId1: user._id,
      userId2: currentUser._id,
    };

    fetch(apiUrl + "chats/createChat", {
      method: "POST",
      body: JSON.stringify(chat),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {});

    pushChatIdToUsers(currentUser, id);
    pushChatIdToUsers(user, id);
  };

  const getAllChats = (chatsId) => {
    if (!chatsId) return;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        chatId: currentUser.chatId,
      }),
    };

    fetch(apiUrl + "chats/getAllChats", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((allChats) => {
        setAllChats(allChats);
        setChatLoad(false);
      })
      .catch((err) => console.error(err));
  };

  const getChatForUser = (userId) => {
    if (!allChats || !userId) return null;

    //chatsId is the chatids for the selectedUser
    const chatId = getHash(userId, currentUser._id);

    let chatsForSelectedUser = allChats.filter((chat) => chat.chatid === chatId);

    if (chatsForSelectedUser.length > 1) {
      const messages = [...chatsForSelectedUser[0].messages, ...chatsForSelectedUser[1].messages];
      chatsForSelectedUser.messages = messages;
    }

    return chatsForSelectedUser[0];
  };

  const reloadLastMessage = () => {
    if (!allChats) return;
    const messages = [];

    allChats.forEach((chat) => {
      if (!chat) return;

      const chatsMessages = chat.messages;
      if (chatsMessages && chatsMessages.length > 0) {
        messages.push({
          chatId: chat.chatid,
          unseen: chat.unseen,
          value: chatsMessages[chatsMessages.length - 1].value,
          type: chatsMessages[chatsMessages.length - 1].type,
        });
      }
    });

    setLastMessages(messages);
  };

  const handleMessageRecived = (message, userId, timeStamp, chatId, messageId, type) => {
    if (userId == currentUser._id) {
      console.log("%cMessage Sent Succesfully '" + message + "'", "color:blue;font-side:1rem");
    } else {
      console.log("%cMessage Recived '" + message + "'", "color:gold;font-side:1rem");
      setAllChats((chat) => {
        //Cloning chat obj
        const newChat = [...chat];
        if (!newChat) return newChat;

        newChat.forEach((c) => {
          if (c && c.chatid === chatId) {
            if (selectedUserRef.current && userId === selectedUserRef.current._id) {
              c.unseen[userId] = 0;
            } else {
              c.unseen[userId] += 1;
            }

            c.messages.push({
              value: message,
              sentBy: userId,
              time: timeStamp,
              id: messageId,
              type,
            });
          }
        });

        return newChat;
      });
    }
  };

  const loadChatIds = () => {
    if (!allUsers || allUsers.length < 1) return;

    const users = allUsers;
    const cUser = currentUser;

    users.forEach((user) => {
      const chatId = getHash(user._id, currentUser._id);

      const check = user.chatId.find((element) => element === chatId);

      if (check === undefined) {
        createChat(chatId, user);
        user.chatId.push(chatId);
        cUser.chatId.push(chatId);
      }
    });

    const socket = io(apiUrl, { transports: ["websocket"] });
    currentUser.chatId.forEach((id) => {
      socket.emit("join", id);
    });

    socket.removeListener("messageRecived", handleMessageRecived);
    socket.on("messageRecived", handleMessageRecived);

    localStorage.setItem("currentUser", JSON.stringify(cUser));
    getAllChats();
    setAllUsers(users);
    setCurrentUser(cUser);
  };

  const clearUnseenCount = (chatId, userId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ chatId, userId });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(apiUrl + "users/clearUnseenCount", requestOptions).catch((error) =>
      console.log("error", error)
    );
  };

  useEffect(() => {
    getAllUsers();
    getAllChats(currentUser.chatId);
  }, []);

  useEffect(() => {
    loadChatIds();
  }, [allUsers]);

  useEffect(() => {
    if (selectedUser) {
      const selectedUserId = selectedUser._id;
      //cloning lastmessages
      const messages = [...lastMessages];
      let chatId;
      messages.forEach((message) => {
        if (message.unseen[selectedUserId] !== undefined) {
          chatId = message.chatId;
          message.unseen[selectedUserId] = 0;
        }
      });

      setLastMessages(messages);
      chatId && clearUnseenCount(chatId, selectedUserId);
    }
  }, [selectedUser, allChats]);

  useEffect(() => {
    reloadLastMessage();
  }, [allUsers, allChats]);

  return (
    <>
      {dataIsLoaded ? (
        <div className="loader"></div>
      ) : (
        <div className="joinOuterContainer ">
          {isSmall ? (
            selectedUser ? (
              chatLoad ? (
                <div>Loading Chat</div>
              ) : (
                <div className="chatBox" id="chatBox">
                  <FullChat
                    setAllChats={setAllChats}
                    setSelectedUser={setSelectedUser}
                    user={selectedUser}
                    chats={getChatForUser(selectedUser._id)}
                  />
                </div>
              )
            ) : (
              <SideBar
                lastMessages={lastMessages}
                allUsers={allUsers}
                setSelectedUser={setSelectedUser}
                selectedUserId={selectedUser && selectedUser._id}
              />
            )
          ) : (
            <>
              <SideBar
                lastMessages={lastMessages}
                allUsers={allUsers}
                setSelectedUser={setSelectedUser}
                selectedUserId={selectedUser && selectedUser._id}
              />
              <div className="chatBox">
                {selectedUser ? (
                  chatLoad ? (
                    <div className="loader"></div>
                  ) : (
                    <FullChat
                      setAllChats={setAllChats}
                      setSelectedUser={setSelectedUser}
                      user={selectedUser}
                      chats={getChatForUser(selectedUser._id)}
                    />
                  )
                ) : (
                  <div className="chatArea">
                    <div className="description">
                      <h1 className="docLogo">
                        <i className="fas fa-user-md"></i>
                      </h1>
                      <h1>Keep Yourself connected</h1>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
