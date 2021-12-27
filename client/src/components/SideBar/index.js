import React, { useState, useEffect } from "react";
import UsersList from "../UsersList";
import { useAuth } from "../../contexts/Auth";
import "./style.css";

const SideBar = ({ allUsers, lastMessages, setSelectedUser, selectedUser, allChats,setFoundedMessageIndex }) => {
  const [query, setQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { currentUser } = useAuth();
  const currentUserParsed = JSON.parse(currentUser);
  

  const search = () => {
    setSearchedUsers([]);
    allUsers.filter((user) => {
      if (query === "") {
        //if query is empty
        return setSearchedUsers((searchedUsers) => [...searchedUsers, user]);
      } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
        //returns filtered array
        return setSearchedUsers((searchedUsers) => [...searchedUsers, user]);
      }
    });
    
    allChats.forEach(chat => {
      chat.messages.filter((message) => {
        if (query === "") {
          //if query is empty
          return;
        } else if (message.value.toLowerCase().includes(query.toLowerCase())) {
            allUsers.filter((user) =>{
              if(user.chatId.find((id) => id === chat.chatid) && user._id !== currentUserParsed._id){
                user.foundedMessage.push(message)
                setSearchedUsers((searchedUsers) => [...searchedUsers, user]);
                return;
              }else{
                return;
              }
            });
        }
      });
    });
  };

  const clearFoundedMessages = () => {
    allUsers.forEach(user => {
      user.foundedMessage = [];
    })
  };
  useEffect(() => {
    clearFoundedMessages();
    search();
  }, [query]);
  return (
    <div className="sideBar" id="sideBar">
      <div className="input-group searchInput px-3 pt-3 mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text bg-white rounded-0 h-100" id="basic-addon1">
            <i className="fas fa-search"></i>
          </span>
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            className="form-control search rounded-0 border_left_0 shadow-none"
            placeholder="Search here..."
            aria-label="Search"
            onChange={(event) => {
              setQuery(event.target.value)
              setSearchedUsers([])
            }}
            value={query}
          />
          {query ? (
            <div className="x-icon-wrapper" onClick={() => {
              setQuery("");
             clearFoundedMessages();
             }}>
              <span className="fas fa-times"></span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <UsersList
        lastMessages={lastMessages}
        users={searchedUsers}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        setFoundedMessageIndex={setFoundedMessageIndex}
      />
    </div>
  );
};

export default SideBar;
