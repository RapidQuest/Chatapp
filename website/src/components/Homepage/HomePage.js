import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import UsersList from "../UsersList/index";
import { TransitionGroup } from "react-transition-group";

import "./Homepage.css";
import FullChat from "../FullChat";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const { height, width } = useWindowDimensions();
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  console.log(height, width);

  const allUsers = [
    {
      _id: 12,
      name: "Ajit Chougule",
      role: "Provider",
      lastMessage: "Something goes here..",
    },
    {
      _id: 13242,
      name: "Alex Carry",
      role: "admin",
      lastMessage: "Something goes here..",
    },
    {
      _id: 14322,
      name: "Arya Stark",
      role: "admin",
      lastMessage: "Something goes here..",
    },
    {
      _id: 1212,
      name: "Ashwini Chougule",
      role: "admin",
      lastMessage: "Something goes here..",
    },
    {
      _id: 1242,
      name: "Colin Sik",
      role: "admin",
      lastMessage: "Something goes here..",
    },
    {
      _id: 1542,
      name: "Jack Aranda",
      role: "admin",
      lastMessage: "Something goes here..",
    },
    {
      _id: 1672,
      name: "John Quil",
      role: "admin",
      lastMessage: "Something goes here..",
    },
    {
      _id: 17652,
      name: "Manny Jah",
      role: "admin",
      lastMessage: "Something goes here..",
    },
    {
      _id: 17542,
      name: "Olive Yew",
      role: "admin",
      lastMessage: "Something goes here..",
    },
    {
      _id: 15432,
      name: "Rose Bush",
      role: "admin",
      lastMessage: "Something goes here..",
    },
  ];

  const [room, setRoom] = useState("");
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

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

  useEffect(() => {
    allUsers.forEach((user, index) => {
      user.color = profileColor(user._id);
    });
  });

  useEffect(() => {
    // if(!selectedUser) document.getElementById("sideBar").style.display = "none";
    if (width <= 760 && selectedUser) displayChatInMobile();
  });

  function displayChatInMobile() {
      document.getElementById("sideBar").style.display = "none";
      document.getElementById("chatBox").style.display = "block";
  }

  return (
    <>
      {width < 760 ? (
        <div className="joinOuterContainer ">
          <div className="right_border">
            <div className="sideBar" id="sideBar">
              <div class="input-group searchInput mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text h-100" id="basic-addon1">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="w-100 text-center mt-2">
                <UsersList
                  fetchUsers={allUsers}
                  selectedUser={setSelectedUser}
                />
              </div>
            </div>
          </div>
          <div className="chatBox" id="chatBox">
            {selectedUser ? (
              <FullChat user={selectedUser} />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="joinOuterContainer ">
          <div className="right_border">
            <div className="sideBar" id="sideBar">
              <div class="input-group searchInput mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text h-100" id="basic-addon1">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              {/* <input className="searchInput mt-3 mb-2" style={{ fontFamily: "FontAwesome", fontSize: "20px"  }} placeholder='&#xf002;  Search here...'/> */}
              {/* <h1 className="heading">Join</h1> */}
              {error && <Alert variant="danger">{error}</Alert>}
              {/* <strong className="text-dark">Email:</strong> <p className="text-dark">{currentUser.email}</p> */}
              {/* <Link to={`/Chat?room=${room}`}>
            <button className="button mt-20" type="submit">Chat Now!</button>
          </Link> */}
              <div className="w-100 text-center mt-2">
                {/* <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button> */}
                <UsersList
                  fetchUsers={allUsers}
                  selectedUser={setSelectedUser}
                />
              </div>
            </div>
          </div>
          <div className="chatBox">
            {selectedUser ? (
              <FullChat user={selectedUser} />
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
        </div>
      )}
    </>
  );
};

export default HomePage;
