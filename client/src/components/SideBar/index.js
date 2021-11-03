import React from "react";
import UsersList from "../UsersList";
import Search from '../SearchBar';

export default function index({ allUsers, setSelectedUser, user }) {
  return (
    <div>
      <div className="sideBar" id="sideBar">
      <Search
        />
        <div className="w-100 text-center mt-2">
          <UsersList fetchUsers={allUsers} setSelectedUser={setSelectedUser} selectedUser={user} />
        </div>
      </div>
    </div>
  );
}
