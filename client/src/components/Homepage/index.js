import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";
import SideBar from "../SideBar";
import FullChat from "../FullChat";
import io from "socket.io-client";

import "./style.css";
import "./loader.css";

const HomePage = () => {
  const unParseCurrentUser = useAuth().currentUser;
  const isSmall = useMediaQuery("(max-width: 760px)", false);

  const [allUsers, setAllUsers] = useState([]);
  const [allChats, setAllChats] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [lastMessages, setLastMessages] = useState([]);
  const [selectedUserChats, setSelectedUserChats] = useState([]);

  const [dataIsLoaded, setDataIsLoaded] = useState(true);

  const [currentUser, setCurrentUser] = useState(JSON.parse(unParseCurrentUser));

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
    fetch(apiUrl + "users/getUsers")
      .then((res) => res.json())
      .then((users) => {
        users.forEach((user) => {
          user.color = profileColor(user._id);
        });
        setAllUsers(users);
      })
      .catch((err) => {
        console.error(err);
      });
  };
// console.log(allUsers);
  const stringToHash = (string) => {
    let hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
      var char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash.toString();
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
        chatId: chatsId,
      }),
    };

    fetch(apiUrl + "chats/getAllChats", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((allChats) => {
        setAllChats(allChats);
      })
      .catch((err) => console.error(err));
  };

  const getChatForUser = (userId) => {
    if (!allChats || !userId) return null;

    //chatsId is the chatids for the selectedUser
    const chatId1 = stringToHash(userId + currentUser._id);
    const chatId2 = stringToHash(currentUser._id + userId);

    let chatsForSelectedUser = allChats.filter((chat) => {
      return chat.chatid == chatId1 || chat.chatid == chatId2;
    });

    if (chatsForSelectedUser.length > 1) {
      const messages = [...chatsForSelectedUser[0].messages, ...chatsForSelectedUser[1].messages];
      chatsForSelectedUser = chatsForSelectedUser[0];
      chatsForSelectedUser.messages = messages;
    }
    return chatsForSelectedUser;
  };

  const reloadLastMessage = () => {
    if (!allChats) return;
    let messages = [];

    allChats.forEach((chat) => {
      if (!chat) return;

      const chatsMessages = chat.messages;
      if (chatsMessages && chatsMessages.length > 0) {
        messages.push({
          chatId: chat.chatid,
          lastMessages: chatsMessages[chatsMessages.length - 1],
        });
      }
      // console.log(messages);
    });

    setLastMessages(messages);
  };

  const loadChatIds = async () => {
    if (!allUsers || allUsers.length < 1) return;

    const users = allUsers;
    const cUser = currentUser;

    await users.forEach((user) => {
      const chatId1 = stringToHash(user._id + currentUser._id);
      const chatId2 = stringToHash(currentUser._id + user._id);
      loadChat(chatId1, chatId2 ,user)
    });

    const socket = io(apiUrl, { transports: ["websocket"] });
    currentUser.chatId.forEach((id) => {
      socket.emit("join", id);
    });

    // socket.off("messageRecived");
    socket.on("messageRecived", (message, userId, timeStamp, messageId, chatId) => {
      // console.log("%cMessage Recived '" + message + "'", "color:gold;font-side:1rem");
      setAllChats((chat) => {
        //Cloning chat obj
        const newChat = JSON.parse(JSON.stringify(chat));
        newChat &&
          newChat.forEach((c) => {
            if (c && c.chatid == chatId) {
              c.messages.push({
                value: message,
                sentBy: userId,
                time: timeStamp,
                id: messageId,
              });
            }
          });

        return newChat;
      });
    });

    localStorage.setItem("currentUser", JSON.stringify(cUser));
    getAllChats(cUser.chatId);
    setAllUsers(users);
    setCurrentUser(cUser);
    
  };

  const loadChat = async (id1, id2 , user) => {
    fetch(apiUrl + 'chats/getChat', {
      method: 'get',
      headers: {
        'id': id1,
      }, 
    })
    .then(response => response.json())
    .then((data) => {
      if(data === null){
        fetch(apiUrl + 'chats/getChat', {
          method: 'get',
          headers: {
            'id': id2,
          },
        })
        .then(response => response.json())
        .then((data) => {
          if(data === null) createChat(id2, user)
          else{
            user.chat = data;
            setAllChats((allChats) => [...allChats, data ]);
          }
        });
      }else{
        user.chat = data;
        setAllChats((allChats) => [...allChats, data ]);
        
      }
      // console.log(user);
    });
  };

  useEffect(() => {
    let count = 0;
    allUsers.forEach(user => {
      if(user.chat !== undefined){
        count++;
      }
      if(count === allUsers.length) setDataIsLoaded(false);
    });
  }, [allUsers, allChats])
  useEffect(() => {
    getAllUsers();
    getAllChats(currentUser.chatId);
  }, []);

  useEffect(() => {
    reloadLastMessage();
  }, [allChats]);

  useEffect(() => {
    loadChatIds();
  }, [allUsers]);

  useEffect(() => {
    selectedUser && setSelectedUserChats(getChatForUser(selectedUser._id));
  }, [selectedUser, allChats]);

  return (
    <>
      {dataIsLoaded ? (
        <div className="loader"></div>
      ) : (
        <div className="joinOuterContainer ">
          {isSmall ? (
            selectedUser ? 
               (
                <div className="chatBox" id="chatBox">
                  <FullChat
                    setAllChats={setAllChats}
                    setSelectedUser={setSelectedUser}
                    user={selectedUser}
                    chats={selectedUserChats}
                  />
                </div>
            ) : (
              <SideBar
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
                {selectedUser ? 
                   (
                    <FullChat
                      setAllChats={setAllChats}
                      setLastMessages={setLastMessages}
                      setSelectedUser={setSelectedUser}
                      user={selectedUser}
                      chats={selectedUserChats}
                    />
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
