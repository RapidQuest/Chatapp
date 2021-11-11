import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { useHistory } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import SideBar from "../SideBar";

import "./style.css";
import "./loader.css";
import FullChat from "../FullChat";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const isSmall = useMediaQuery("(max-width: 760px)", false);

  const [allUsers, setAllUsers] = useState([]);
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(true);
  const [chatLoad, setChatLoad] = useState(true);
  const apiUrl = "http://localhost:5000/";
  const currentUserParsed = JSON.parse(currentUser);

  const getAllUsers = () => {
    fetch(apiUrl + "users/getUsers")
      .then((res) => res.json())
      .then((json) => {
        json.forEach((element) => {
          loadLastMessage(
            stringToHash(element.name + currentUserParsed.name),
            stringToHash(currentUserParsed.name + element.name),
            element
          );
        });
        setAllUsers(json);
        setDataIsLoaded(false);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  function stringToHash(string) {
    var hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
      var char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }

  const loadLastMessage = (id1, id2, user) => {
    fetch(apiUrl + "chats/lastMessage", {
      method: "get",
      headers: {
        id: id1,
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
                user.lastMessage =
                  data.messages[0] === undefined
                    ? "start new conversation"
                    : data.messages[0].value;
              }
            });
        } else {
          user.lastMessage =
            data.messages[0] === undefined ? "start new conversation" : data.messages[0].value;
        }
      });
  };

  const loadChat = (id1, id2, user) => {
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

  const pushChatIdToUsers = (user, id) => {
    fetch(apiUrl + "chats/getUser", {
      method: "get",
      headers: {
        id: user._id,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === null) console.error("no user found");
        else {
          user.chatId.forEach((element) => {
            if (element === id) return;
          });
          data.chatId.push(id);
          fetch(apiUrl + "users/updateUser", {
            method: "put",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              if (response.status == 200) {
              } else {
                return response.json().then((json) => {
                  throw new Error(json.msg);
                });
              }
            })
            .catch(function (json) {});
        }
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

  var tagCount = 0;
  var tagClasses = {};

  function profileColor(tagName) {
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
  }

  allUsers.forEach((user, index) => {
    user.color = profileColor(user._id);
  });

  useEffect(() => {
    setChatLoad(true);
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
                  <FullChat setSelectedUser={setSelectedUser} user={selectedUser} chats={chat} />
                </div>
              )
            ) : (
              <SideBar
                allUsers={allUsers}
                setSelectedUser={setSelectedUser}
                user={selectedUser}
                loadChat={loadChat}
              />
            )
          ) : (
            <>
              <SideBar
                allUsers={allUsers}
                setSelectedUser={setSelectedUser}
                user={selectedUser}
                loadChat={loadChat}
              />
              <div className="chatBox">
                {selectedUser ? (
                  chatLoad ? (
                    <div className="loader"></div>
                  ) : (
                    <FullChat setSelectedUser={setSelectedUser} user={selectedUser} chats={chat} />
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
