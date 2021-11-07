import React, { useState,useEffect } from "react";
// import onlineIcon from '../../icons/onlineIcon.png';
import "./tags.css";
import "./style.css";
import ProfileImage from "../ProfileImage";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";

const UsersList = ({ fetchUsers, setSelectedUser, selectedUser, loadChat }) => {
  const isSmall = useMediaQuery("(max-width: 760px)", false);
  const centerContent = useMediaQuery("(min-width: 1500px)", false);
  const { currentUser, logout, getAllUsers } = useAuth();
  const currentUserParsed = JSON.parse(currentUser)
  const apiUrl = 'http://localhost:5000/';

  function Onselect() {
    let elements = document.getElementsByClassName("block_item btn activeClass");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("activeClass");
    }
  }


  function checkUser(user, parsedCurrentUser){
    return user._id === parsedCurrentUser._id
  }


  
  function stringToHash(string) {
    var hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
         var char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

// useEffect(() => {
//   fetchUsers.forEach(user => {
//     loadLastMessage(stringToHash(user.name + currentUserParsed.name), stringToHash(currentUserParsed.name + user.name  ), user);
//     console.log(user);
//   });
//   setLoading(false);
// }, [])

  return fetchUsers ? (
    <div className="allUsers">
      <div className="block_item_container text-center" id="items">
          {fetchUsers.map((user, i) => (
              <div
              className={checkUser(user, currentUserParsed) ?"block_item hover btn hide": "block_item hover btn"}
              id={user._id}
              onClick={() => {
                setSelectedUser(user);
                loadChat(stringToHash(user.name + currentUserParsed.name), stringToHash(currentUserParsed.name + user.name  ), user)
                Onselect();
                document.getElementById(user._id).classList.add("activeClass");
              }}
              key={i}
            >
              <div className="row">
                <div className={isSmall ? "col-1" : centerContent ? "col-2" :  "col-2 d-flex justify-content-center"}>
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
