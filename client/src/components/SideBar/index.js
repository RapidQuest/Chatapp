import React, { useState, useEffect } from "react";
import UsersList from "../UsersList";

const SideBar = ({ allUsers, lastMessages, setSelectedUser, selectedUserId }) => {
  const [query, setQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  function search() {
    setSearchedUsers("");
    allUsers.filter((user) => {
      if (query === "") {
        //if query is empty
        return setSearchedUsers((searchedUsers) => [...searchedUsers, user]);
      } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
        //returns filtered array
        return setSearchedUsers((searchedUsers) => [...searchedUsers, user]);
      }
    });
  }

  useEffect(() => {
    search();
  }, [query]);

  return (
    <>
      <div className="sideBar" id="sideBar">
        <div className="input-group searchInput px-3 pt-3 mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text bg-white rounded-0 h-100" id="basic-addon1">
              <i className="fas fa-search"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control search rounded-0 border_left_0 shadow-none"
            placeholder="Search here..."
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <UsersList
          lastMessages={lastMessages}
          users={searchedUsers}
          setSelectedUser={setSelectedUser}
          selectedUserId={selectedUserId}
        />
      </div>
    </>
  );
};

export default SideBar;
