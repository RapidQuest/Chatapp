import React, { useState, useEffect } from "react";
import ProfileImage from "../ProfileImage";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";
import { getHash } from "../../utils";

import "./tags.css";
import "./style.css";
// import onlineIcon from '../../icons/onlineIcon.png';

const UsersList = ({ users, lastMessages, setSelectedUser, selectedUserId }) => {
  const isSmall = useMediaQuery("(max-width: 760px)", false);
  const centerContent = useMediaQuery("(min-width: 1500px)", false);
  const { currentUser } = useAuth();
  const currentUserParsed = JSON.parse(currentUser);

  const getLastMessage = (userId) => {
    const chatId = getHash(userId, currentUserParsed._id);

    const message =
      lastMessages && lastMessages.filter((lastMessage) => lastMessage.chatId === chatId)[0];

    if (message && message.type !== "string") {
      return `
        <span class="fas fa-camera"></span>
        <span>Image</span>
      `;
    }
    return message?.value;
  };

  const getUnseenNumber = (userId) => {
    const chatId = getHash(userId, currentUserParsed._id);

    const message =
      lastMessages && lastMessages.filter((lastMessage) => lastMessage.chatId === chatId)[0];

    return message?.unseen?.[userId];
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
            <div className="row h-100">
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
                <div className="row h-100">
                  <p className="col-8 name-last-msg">
                    <span className="item_name">{user.name}</span>
                    <span
                      className="lastMessage"
                      dangerouslySetInnerHTML={{ __html: getLastMessage(user._id) }}
                    ></span>
                  </p>
                  <p className="col-4 item_role">
                    <span className="role">{user.role}</span>
                    {getUnseenNumber(user._id) ? (
                      <span className="unseen-count">{getUnseenNumber(user._id)}</span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default UsersList;
