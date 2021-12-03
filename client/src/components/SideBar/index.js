import React, { useState, useEffect } from "react";
import UsersList from "../UsersList";
import "./style.css";

const SideBar = ({ allUsers, lastMessages, setSelectedUser, selectedUserId, allChats }) => {
  const [query, setQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

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
          return 0;
        } else if (message.value.toLowerCase().includes(query.toLowerCase())) {
          //returns filtered array
          const foundUser = allUsers.find((element) => element._id === message.sentBy);
          console.log(message);
          return setSearchedUsers((searchedUsers) => [...searchedUsers, foundUser]);
          // return;
        }
      });
    });
  };

  useEffect(() => {
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
            onChange={(event) => setQuery(event.target.value)}
            value={query}
          />
          {query ? (
            <div className="x-icon-wrapper" onClick={() => setQuery("")}>
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
        selectedUserId={selectedUserId}
      />
    </div>
  );
};

export default SideBar;
