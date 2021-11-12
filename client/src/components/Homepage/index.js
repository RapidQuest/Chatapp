import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";
import SideBar from "../SideBar";
import FullChat from "../FullChat";
import io from "socket.io-client";

import "./style.css";
import "./loader.css";

const HomePage = () => {
  const { currentUser, logout } = useAuth();
  const isSmall = useMediaQuery("(max-width: 760px)", false);

  const [allUsers, setAllUsers] = useState([]);
  const [allChats, setAllChats] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [lastMessages, setLastMessages] = useState([]);
  const [chat, setChat] = useState([]);

  const [dataIsLoaded, setDataIsLoaded] = useState(true);
  const [chatLoad, setChatLoad] = useState(true);

  const apiUrl = "http://localhost:5000/";
  const currentUserParsed = JSON.parse(currentUser);

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

          setLastMessage(
            stringToHash(user._id + currentUserParsed._id),
            stringToHash(currentUserParsed._id + user._id),
            user
          );
        });

        setAllUsers(users);
        setDataIsLoaded(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const stringToHash = (string) => {
    let hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
      var char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  };

  const setLastMessage = (id1, id2, user) => {
    setLastMessages([]);
    fetch(apiUrl + "chats/lastMessage", {
      method: "get",
      headers: {
        id: id1,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let lastMessage = null;
        if (data === null) {
          fetch(apiUrl + "chats/lastMessage", {
            method: "get",
            headers: {
              id: id2,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data === null) return;
              else {
                lastMessage =
                  data.messages[0] === undefined
                    ? "start new conversation"
                    : data.messages[0].value;
              }
            });
        } else {
          lastMessage =
            data.messages[0] === undefined ? "start new conversation" : data.messages[0].value;
        }

        setLastMessages((lastMessages) => [...lastMessages, { userId: user._id, lastMessage }]);
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
      if (response.status == 200) {
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
          user.chatId.forEach((element) => {
            if (element === id) return;
          });
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

    pushChatIdToUsers(currentUserParsed, id);
    pushChatIdToUsers(user, id);
  };

  // const getAllChats = (chatsId) => {
  //   if (!chatsId) return;

  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: JSON.stringify({
  //       chatId: currentUserParsed.chatId,
  //     }),
  //   };

  //   allUsers.forEach(user => {
  //     const chatId1 = stringToHash(user._id + currentUserParsed._id);
  //     const chatId2 = stringToHash(currentUserParsed._id + user._id);
  //     loadChat(chatId1,chatId2,user);
  //   });

  //   // fetch(apiUrl + "chats/getAllChats", requestOptions)
  //   //   .then((response) => response.json())
  //   //   .then((allChats) => {
  //   //     setAllChats(allChats);
  //   //     setChatLoad(false);
  //   //   })
  //   //   .catch((err) => console.error(err));
  // };

  // const getChatForUser = (user) => {
  //   if (!allChats || !user) return null;

  //   //chatsId is the chatids for the selectedUser
  //   const chatId1 = stringToHash(user._id + currentUserParsed._id);
  //   const chatId2 = stringToHash(currentUserParsed._id + user._id);
  //   loadChat(chatId1,chatId2,user);
  //   const chatsForSelectedUser = allChats.filter((chat) => {
  //     return chat.chatid == chatId1 || chat.chatid == chatId2;
  //   });

  //   if (chatsForSelectedUser.length > 1) {
  //     chatsForSelectedUser = [...chatsForSelectedUser[0], ...chatsForSelectedUser[1]];
  //   }

  //   return chatsForSelectedUser[0];
  // };

  useEffect(() => {
    // getAllChats(currentUserParsed.chatId);
    // const socket = io(apiUrl, { transports: ["websocket"] });
    // currentUserParsed.chatId.forEach((id) => {
    //   socket.emit("join", id);
    //   socket.on("messageRecived", (message, userId, timeStamp, messageId) => {
    //     setAllChats((chats) => [
    //       ...chats,
    //       { chatId: id, message: { message, userId, timeStamp, messageId } },
    //     ]);
    //   });
    // });
  }, [currentUser]);

  const loadChat = async (id1, id2, user) => {
    fetch(apiUrl + "chats/getChat", {
      method: "get",
      headers: {
        id: id1,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          fetch(apiUrl + "chats/getChat", {
            method: "get",
            headers: {
              id: id2,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data === null) createChat(id2, user);
              else {
                setChat(data);
              }
            });
        } else {
          setChat(data);
        }
        setChatLoad(false);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    if (selectedUser) {
      const chatId1 = stringToHash(selectedUser._id + currentUserParsed._id);
      const chatId2 = stringToHash(currentUserParsed._id + selectedUser._id);
      loadChat(chatId1, chatId2, selectedUser);
    }
  }, [selectedUser]);
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
                    setLastMessages={setLastMessages}
                    setSelectedUser={setSelectedUser}
                    user={selectedUser}
                    chats={chat}
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
                      setLastMessages={setLastMessages}
                      setSelectedUser={setSelectedUser}
                      user={selectedUser}
                      chats={chat}
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

export default HomePage;
