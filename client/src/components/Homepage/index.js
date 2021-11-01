import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { useHistory } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import SideBar from "../SideBar";

import "./style.css";
import FullChat from "../FullChat";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const isSmall = useMediaQuery("(max-width: 760px)", false);
  console.log(JSON.parse(currentUser).name);
  // const [allUsers, setAllUsers] = useState([]);
    
  const allUsers = JSON.parse(localStorage.getItem('allUsers'))


  console.log(allUsers);
  const [room, setRoom] = useState("");
  var tagCount = 0;
  var tagClasses = {};

  function profileColor(tagName) {
    const tagColors = [
      "lightpink",
      "mustdo",
      "agenda",
      "someday",
      "purple",
      "bronze",
      "aqua",
      "grey",
      "silver",
      "brown",
      "cranberry",
      "orange",
      "brightorange",
      "peach",
      "maringold",
      "lightgreen",
      "darkgreen",
      "teal",
      "lightblue",
      "darkblue",
      "lavender",
      "plum",
      "lightgray",
      "darkgray",
    ];
    if (tagClasses[tagName]) {
      return tagClasses[tagName];
    }
    tagClasses[tagName] = tagColors[tagCount];
    tagCount++;
    if (tagCount > tagColors.length) {
      tagCount = 0;
    }
    return tagClasses[tagName];
  }

  allUsers.forEach((user, index) => {
    user.color = profileColor(user._id);
  });

  return (
    <>
      <div className="joinOuterContainer ">
        {isSmall ? (
          selectedUser ? (
            <div className="chatBox" id="chatBox">
              <FullChat setSelectedUser={setSelectedUser} user={selectedUser} />
            </div>
          ) : (
            <SideBar allUsers={allUsers} setSelectedUser={setSelectedUser} />
          )
        ) : (
          <>
            <SideBar allUsers={allUsers} setSelectedUser={setSelectedUser} />
            <div className="chatBox">
              {selectedUser ? (
                <FullChat setSelectedUser={setSelectedUser} user={selectedUser} />
              ) : (
                <div className="chatArea">
                  <div className="description">
                    <h1 className="docLogo">
                      <i className="fas fa-user-md"></i>
                    </h1>
                    <h1>Keep Yourself connected</h1>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
