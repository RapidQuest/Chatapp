import React from "react";
import UsersList from "../UsersList";
import Search from '../SearchBar';

export default function index({ allUsers, setSelectedUser }) {
  return (
    <div>
      <div className="sideBar" id="sideBar">
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        />
        <div className="w-100 text-center mt-2">
          <UsersList fetchUsers={allUsers} setSelectedUser={setSelectedUser} />
        </div>
      </div>
    </div>
  );
}
