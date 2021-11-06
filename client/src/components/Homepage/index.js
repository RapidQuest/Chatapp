import React, { useState,useEffect } from "react";
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
  // console.log(JSON.parse(currentUser).name);
  const [allUsers, setAllUsers] = useState([]);
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(true);
  const [chatLoad, setChatLoad] = useState(true);
  const apiUrl = 'http://localhost:5000/';
  const currentUserParsed = JSON.parse(currentUser)

  const getAllUsers = async () =>{
    fetch( apiUrl + 'users/getUsers')
      .then((res) => res.json())
      .then((json) => {
        setAllUsers(json);
        setDataIsLoaded(false);
      })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  // console.log(allUsers);

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
            console.log('got data from id2');
            console.log(data);
            setChat(data);
          }
        });
      }else{
        console.log('got data from id1');
        console.log(data);
        setChat(data);
      }
      setChatLoad(false);
    });
  };

  const pushChatIdToUsers = async (user,id) => {
    await fetch(apiUrl + 'chats/getUser', {
      method: 'get',
      headers: {
        'id': user._id,
      },
    })
    .then(response => response.json())
    .then((data) => {
      if(data === null) console.log('no user found');
      else{
        user.chatId.forEach(element => {
          if(element === id) return console.log("Id Already present");
        });
        data.chatId.push(id);
        fetch(apiUrl + 'users/updateUser', {
          method: 'put',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(function (response) {
            if (response.status == 200) {
              console.log("pushed");
            } else {
              return response.json().then((json) => {
                throw new Error(json.msg);
              });
            }
          })
          .catch(function (json) {
          });
      }
    });
  }

  const createChat = async (id, user) => {
    const chat = {
      "chatid" : id
    }
    await fetch(apiUrl + 'chats/createChat', {
      method: 'POST',
      body: JSON.stringify(chat),
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json);
    });
    console.log("chat created");
    await pushChatIdToUsers(currentUserParsed, id);
    await pushChatIdToUsers(user, id);
  }

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
  console.log(chat);

  useEffect(() => {
    setChatLoad(true)
  }, [selectedUser])

  return (
    <>{dataIsLoaded? <div class="loader"></div>
      : <div className="joinOuterContainer ">
      {isSmall ? (
        selectedUser ? (
          chatLoad? <div>Loading Chat</div>
          :<div className="chatBox" id="chatBox">
          <FullChat setSelectedUser={setSelectedUser} user={selectedUser} chats={chat} />
        </div>
        ) : (
          <SideBar allUsers={allUsers} setSelectedUser={setSelectedUser} user={selectedUser} loadChat={loadChat}  />
        )
      ) : (
        <>
          <SideBar allUsers={allUsers} setSelectedUser={setSelectedUser} user={selectedUser} loadChat={loadChat} />
          <div className="chatBox">
            {selectedUser ? chatLoad ? ( <div class="loader"></div>
            ):<FullChat setSelectedUser={setSelectedUser} user={selectedUser} chats={chat} /> : (
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
    </div>}
    </>
  );
};

export default HomePage;
