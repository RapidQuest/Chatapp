import React from "react";
import UsersList from "../UsersList";
import Search from "../SearchBar";

export default function index({ allUsers, setSelectedUser, user, loadChat }) {
  return (
    <>
      <div className="sideBar" id="sideBar">
        <Search />
        <UsersList users={allUsers} setSelectedUser={setSelectedUser} selectedUser={user} />
      </div>
    </>
  );
}
