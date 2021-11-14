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

  const stringToHash = (string) => {
    let hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
      var char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash.toString();
  };

  const getLastMessage = (userId) => {
    const chatId1 = stringToHash(userId + currentUserParsed._id);
    const chatId2 = stringToHash(currentUserParsed._id + userId);

    const message =
      lastMessages &&
      lastMessages.filter(
        (lastMessage) => lastMessage.chatId == chatId1 || lastMessage.chatId == chatId2
      )[0];

    return message?.value;
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
                <ProfileImage userName={user.name} color={user.color} />
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
