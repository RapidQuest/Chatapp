import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { useHistory } from "react-router-dom";
import { Link, useLocation, useHistory } from "react-router-dom";
import UsersList from "../UsersList/index";
import useMediaQuery from "../../hooks/useMediaQuery";
import SideBar from "../SideBar"


import "./style.css";
import FullChat from "../FullChat";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const isSmall = useMediaQuery("(max-width: 760px)", false)

  const allUsers = [
    {
      _id: 12,
      name: "Ajit Chougule",
      role: "Provider",
      lastMessage:
        "Something goes here..Something goes here..Something goes here..Something goes here..",
        messages:[]
    },
    {
      _id: 13242,
      name: "Alex Carry",
      role: "admin",
      lastMessage: "Something goes here..",
      messages:[]
    },
    {
      _id: 14322,
      name: "Arya Stark",
      role: "admin",
      lastMessage: "Something goes here..",
      messages:[]
    },
    {
      _id: 1212,
      name: "Ashwini Chougule",
      role: "admin",
      lastMessage: "Something goes here..",
      messages:[]
    },
    {
      _id: 1242,
      name: "Colin Sik",
      role: "admin",
      lastMessage: "Something goes here..",
      messages:[]
    },
    {
      _id: 1542,
      name: "Jack Aranda",
      role: "admin",
      lastMessage: "Something goes here..",
      messages:[]
    },
    {
      _id: 1672,
      name: "John Quil",
      role: "admin",
      lastMessage: "Something goes here..",
      messages:[]
    },
    {
      _id: 17652,
      name: "Manny Jah",
      role: "admin",
      lastMessage: "Something goes here..",
      messages:[]
    },
    {
      _id: 17542,
      name: "Olive Yew",
      role: "admin",
      lastMessage: "Something goes here..",
      messages:[]
    },
    {
      _id: 15432,
      name: "Rose Bush",
      role: "admin",
      lastMessage: "Something goes here..",
      messages:[]
    },
  ];

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
                <FullChat setSelectedUser={setSelectedUser} user={selectedUser}/>
              ) : (
                <div className="chatArea">
                  <span className="description">
                    <h1 className="docLogo">
                      <i className="fas fa-user-md"></i>
                    </h1>
                    <h1>Keep Yourself connected</h1>
                  </span>
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
