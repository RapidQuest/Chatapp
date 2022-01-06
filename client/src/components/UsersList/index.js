import React from "react";
import ProfileImage from "../ProfileImage";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";
import { getHash } from "../../utils";

import "./tags.css";
import "./style.css";
// import onlineIcon from '../../icons/onlineIcon.png';

const UsersList = ({ users, lastMessages, setSelectedUser, selectedUserId, setFoundedMessageIndex }) => {
  const isSmall = useMediaQuery("(max-width: 760px)", false);
  const centerContent = useMediaQuery("(min-width: 1500px)", false);
  const { currentUser } = useAuth();
  const currentUserParsed = JSON.parse(currentUser);

  const filteredResults = Array.from(new Set(users.map(a => a._id)))
  .map(id => {
    return users.find(a => a._id === id)
  })
  
  const getLastMessage = (userId) => {
    const chatId = getHash(userId, currentUserParsed._id);

    const message =
      lastMessages && lastMessages.filter((lastMessage) => lastMessage.chatId === chatId)[0];

    return message;
  };

  if(users){
    filteredResults.forEach(user => {
      user.lastMessage = getLastMessage(user._id);
    });
    
    filteredResults.sort((a, b) => a?.lastMessage?.time < b?.lastMessage?.time ? 1:-1).map(
      (item, i) => {}
    )
  }

  const getUnseenNumber = (userId) => {
    const chatId = getHash(userId, currentUserParsed._id);

    const message =
      lastMessages && lastMessages.filter((lastMessage) => lastMessage.chatId === chatId)[0];

    return message?.unseen?.[userId];
  };

  return filteredResults ? (
    <div className="allUsers">
      <div className="block_item_container text-center" id="items">
        {filteredResults.map((user, i) => (
          user.foundedMessage[0] ? user.foundedMessage.map((foundedMessage,ind) => (
            <div
              className={
                "block_item hover btn " +
                (user._id === currentUserParsed._id ? "hide " : "") +
                (user._id === selectedUserId ? "active" : "")
              }
              id={user._id}
              onClick={() => {
                setSelectedUser(user);
                setFoundedMessageIndex(ind);
              }}
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
                  <ProfileImage userName={user?.name} color={user?.color} />
                </div>
                <div className={isSmall ? "col-11 pd-l" : "col-10 pd-l"}>
                  <div className="row h-100">
                    <p className="col-8 name-last-msg">
                      <span className="item_name">{user.name}</span>
                       <span className="lastMessage">{foundedMessage.value}</span>
                    </p>
                    <p className="col-4 item_role">
                      <span className="role">{user?.role}</span>
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
          ))
          :
          <div
            className={
              "block_item hover btn " +
              (user._id === currentUserParsed._id ? "hide " : "") +
              (user._id === selectedUserId ? "active" : "")
            }
            id={user._id}
            onClick={() => {
              setSelectedUser(user);
              setFoundedMessageIndex(null);
            }}
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
                <ProfileImage userName={user?.name} color={user?.color} />
              </div>
              <div className={isSmall ? "col-11 pd-l" : "col-10 pd-l"}>
                <div className="row h-100">
                  <p className="col-8 name-last-msg">
                    <span className="item_name">{user.name}</span>
                    {
                    user.lastMessage?.type !== 'string' ? <span className="lastMessage"><span class="fas fa-camera"> </span>Image</span> : 
                    <span className="lastMessage">{getLastMessage(user._id)?.value}</span>
                    }
                  </p>
                  <p className="col-4 item_role">
                    <span className="role">{user?.role}</span>
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
