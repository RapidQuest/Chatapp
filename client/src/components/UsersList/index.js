import React from "react";
import { v4 as uuidv4 } from 'uuid';
// import onlineIcon from '../../icons/onlineIcon.png';
import "./tags.css";
import "./style.css";
import ProfileImage from "../ProfileImage";
import { useAuth } from "../../contexts/Auth";
import useMediaQuery from "../../hooks/useMediaQuery";

const UsersList = ({ fetchUsers, setSelectedUser }) => {
  const isSmall = useMediaQuery("(max-width: 760px)", false);
  const { currentUser, logout } = useAuth();
  const currentUserParsed = JSON.parse(currentUser)
  // const id = uuidv4();
  // console.log(id);

  function Onselect() {
    let elements = document.getElementsByClassName("block_item btn activeClass");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("activeClass");
    }
  }


  function checkUser(user, parsedCurrentUser){
    return user._id === parsedCurrentUser._id
  }

  return fetchUsers ? (
    <div className="block_item_container" id="items">
        {fetchUsers.map((user, i) => (
          
            <div
            className={checkUser(user, currentUserParsed) ? "block_item hover btn hide": "block_item hover btn"}
            id={user._id}
            onClick={() => {
              setSelectedUser(user);
              Onselect();
              document.getElementById(user._id).classList.add("activeClass");
            }}
            key={i}
          >
            <div className="row">
              <div className={isSmall ? "col-1" : "col-2"}>
                <ProfileImage user={user} />
              </div>
              <div className={isSmall ? "col-11 leftPadInMob" : "col-10 leftPadInMob"}>
                <div className="row paddingTop">
                  <h6 className="col-8 item_name">{user.name}</h6>
                  <p className="col-4 item_role">{user.role}</p>
                </div>
                <p className="lastMessage">{user._id}</p>
              </div>
            </div>
          </div>
          
          
        ))}
    </div>
  ) : null;
};

export default UsersList;
