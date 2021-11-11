import React from "react";
import UsersList from "../UsersList";
import Search from "../SearchBar";

const SideBar = ({ allUsers, lastMessages, setSelectedUser, selectedUserId }) => {
  return (
    <>
      <div className="sideBar" id="sideBar">
        <Search />
        <UsersList
          lastMessages={lastMessages}
          users={allUsers}
          setSelectedUser={setSelectedUser}
          selectedUserId={selectedUserId}
        />
      </div>
    </>
  );
};

export default SideBar;
