import React from "react";
import UsersList from "../UsersList";
import Search from "../SearchBar";

const SideBar = ({ allUsers, setSelectedUser, user }) => {
  return (
    <>
      <div className="sideBar" id="sideBar">
        <Search />
        <UsersList users={allUsers} setSelectedUser={setSelectedUser} selectedUser={user} />
      </div>
    </>
  );
};

export default SideBar;
