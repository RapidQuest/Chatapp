import React, { useState, useEffect } from "react";
// import onlineIcon from '../../icons/onlineIcon.png';
import "./tags.css";
import "./style.css";
import ProfileImage from "../ProfileImage";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";

const UsersList = ({ users, setSelectedUser, selectedUser, loadChat }) => {
  const isSmall = useMediaQuery("(max-width: 760px)", false);
  const centerContent = useMediaQuery("(min-width: 1500px)", false);
  const { currentUser, logout, getAllUsers } = useAuth();
  const currentUserParsed = JSON.parse(currentUser);
  const apiUrl = "http://localhost:5000/";

  const Onselect = () => {
    let elements = document.getElementsByClassName("block_item btn activeClass");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("activeClass");
    }
  };

  const checkUser = (user, parsedCurrentUser) => {
    return user._id === parsedCurrentUser._id;
  };

  const stringToHash = (string) => {
    let hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  };

  return users ? (
    <div className="allUsers">
      <div className="block_item_container text-center" id="items">
        {users.map((user, i) => (
          <div
            className={
              checkUser(user, currentUserParsed)
                ? "block_item hover btn hide"
                : "block_item hover btn"
            }
            id={user._id}
            onClick={() => {
              setSelectedUser(user);
              Onselect();
              document.getElementById(user._id).classList.add("activeClass");
            }}
            key={user._id}
          >
            <div className="row">
              <div
                className={
                  isSmall
                    ? "col-1"
                    : centerContent
                    ? "col-2"
                    : "col-2 d-flex justify-content-center"
                }
              >
                <ProfileImage user={user} />
              </div>
              <div className={isSmall ? "col-11 pd-l" : "col-10 pd-l"}>
                <div className="row paddingTop">
                  <h6 className="col-8 item_name">{user.name}</h6>
                  <p className="col-4 item_role">{user.role}</p>
                </div>

                <p className="lastMessage">{user.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default UsersList;
