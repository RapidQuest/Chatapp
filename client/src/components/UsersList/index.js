import React, { useState, useEffect } from "react";
import ProfileImage from "../ProfileImage";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";
import "./tags.css";
import "./style.css";
// import onlineIcon from '../../icons/onlineIcon.png';

const UsersList = ({ users, lastMessages, setSelectedUser, selectedUserId }) => {
  const isSmall = useMediaQuery("(max-width: 760px)", false);
  const centerContent = useMediaQuery("(min-width: 1500px)", false);
  const { currentUser } = useAuth();
  const currentUserParsed = JSON.parse(currentUser);

  const apiUrl = "http://localhost:5000/";

  const Onselect = () => {
    let elements = document.getElementsByClassName("block_item btn activeClass");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("activeClass");
    }
  };

  const getLastMessage = (userId) => {
    const message = lastMessages.filter((lastMessage) => lastMessage.userId == userId)[0];
    console.log({ lastMessages, message, userId });
    return message?.lastMessages;
  };

  return users ? (
    <div className="allUsers">
      <div className="block_item_container text-center" id="items">
        {users.map((user, i) => (
          <div
            className={
              "block_item hover btn " +
              (user._id === currentUserParsed._id ? "hide " : "") +
              (user._id === selectedUserId ? "active" : "")
            }
            id={user._id}
            onClick={() => setSelectedUser(user)}
            key={user._id}
          >
            <div className="row">
              <div
                className={
                  isSmall
                    ? "col-1"
                    : centerContent
                    ? "col-2 d-flex justify-content-center"
                    : "col-2"
                }
              >
                <ProfileImage user={user} />
              </div>
              <div className={isSmall ? "col-11 pd-l" : "col-10 pd-l"}>
                <div className="row paddingTop">
                  <h6 className="col-8 item_name">{user.name}</h6>
                  <p className="col-4 item_role">{user.role}</p>
                </div>
                <p className="lastMessage">{getLastMessage(user._id)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default UsersList;
