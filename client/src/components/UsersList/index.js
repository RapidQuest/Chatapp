import React, { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
// import onlineIcon from '../../icons/onlineIcon.png';
import "./tags.css";
import "./style.css";
import ProfileImage from "../ProfileImage";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";

const UsersList = ({ fetchUsers, setSelectedUser, selectedUser }) => {
  const isSmall = useMediaQuery("(max-width: 760px)", false);
  const { currentUser, logout, storeProfileInfo } = useAuth();
  const currentUserParsed = JSON.parse(currentUser)
  let existingMessages = [];
  if(selectedUser != null){
    let existingMessages = JSON.parse(localStorage.getItem(selectedUser._id));
  }
  // const id = uuidv4();
  // console.log(id);

  function Onselect() {
    let elements = document.getElementsByClassName("block_item btn activeClass");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("activeClass");
    }
  }


  function checkUser(user, parsedCurrentUser){
    return user._id === parsedCurrentUser._id
  }

  function stringToHash(string) {
    var hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
         var char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

  function createChatId(currntUser, ChatTo){
    const string1 = currntUser.name + ChatTo.name;
    const string2 = ChatTo.name + currntUser.name;
    const chatId1 = stringToHash(string1);
    const chatId2 = stringToHash(string2);
    const apiUrl = 'http://localhost:5000/';

    fetch(  apiUrl + 'chats/getChat', {
      method: 'get',
      headers: {
        'id': chatId1,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          console.log("chatId alreay saved");
          return response.json();
        } else {
          return response.json().then((json) => {
            throw new Error(json.message);
          });
        }
      })
      .then(function (data) {
        if(data == null){
          
          fetch(  apiUrl + 'chats/getChat', {
            method: 'get',
            headers: {
              'id': chatId2,
            },
          })
          .then((response) => {
            if (response.status == 200) {
              console.log("chatId alreay saved");
              return response.json();
            } else {
              return response.json().then((json) => {
                throw new Error(json.message);
              });
            }
          })
          .then(function (data) {
            if(data == null){
              
              const data = {
                "chatid" : chatId2
              }
              fetch(  apiUrl + 'chats/createChat', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
              })
              .then((response) => {
                if (response.status == 200) {
                  currntUser.chatId.push(chatId2);
                  console.log(currntUser);
                  pushChatIdToUsers(currntUser)
                  ChatTo.chatId.push(chatId2);
                  console.log(ChatTo);
                  pushChatIdToUsers(ChatTo);

                  return response.json();
                } else {
                  return response.json().then((json) => {
                    throw new Error(json.message);
                  });
                }
              })
              .then(function (data) {
                console.log(data);
              })
              .catch(function (json) {
              });

            }
            else{
              console.log(data);
              //do something with the messages
            }
          })
          .catch(function (json) {
          });
        }
        else{
          console.log(data);
          //do something with the messages
        }
      })
      .catch(function (json) {
      });
  }

  function pushChatIdToUsers(user){
    const apiUrl = 'http://localhost:5000/';
    fetch(apiUrl + 'users/updateuser', {
      method: 'put',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
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
      .catch(function (json) {
      });
  }

  useEffect(() => {
    if(selectedUser !== null ) {
      createChatId(currentUserParsed, selectedUser)
    }
  }, [selectedUser])

  function setLastMessage(id){
    const getMessages = JSON.parse(localStorage.getItem(id));
    console.log(getMessages);
    if(getMessages === undefined || getMessages === null){
      return 'Start a new conversation';
    }else{
      return getMessages[getMessages.length - 1].value;
    }
  }

  return fetchUsers ? (
    <div className="block_item_container" id="items">
        {fetchUsers.map((user, i) => (
          
            <div
            className={checkUser(user, currentUserParsed) ? "block_item hover btn hide": "block_item hover btn"}
            id={user._id}
            onClick={() => {
              setSelectedUser(user);
              Onselect();
              document.getElementById(user._id).classList.add("activeClass");
            }}
            key={i}
          >
            <div className="row">
              <div className={isSmall ? "col-1" : "col-2"}>
                <ProfileImage user={user} />
              </div>
              <div className={isSmall ? "col-11 pd-l" : "col-10 pd-l"}>
                <div className="row paddingTop">
                  <h6 className="col-8 item_name">{user.name}</h6>
                  <p className="col-4 item_role">{user.role}</p>
                </div>
                <p className="lastMessage">{setLastMessage(user._id)}</p>
              </div>
            </div>
          </div>
          
          
        ))}
    </div>
  ) : null;
};

export default UsersList;
