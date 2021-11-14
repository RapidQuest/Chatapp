import React from "react";

import ProfileImage from "../ProfileImage";
import useMediaQuery from "../../hooks/useMediaQuery";

import "./style.css";

const InfoBar = ({ user, setSelectedUser }) => {
  const isSmall = useMediaQuery("(max-width: 760px)", false);

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        {user && isSmall ? (
          <div className="backButton" id="backButton" onClick={() => setSelectedUser(null)}>
            <i className="fas fa-chevron-left" id="back_icon"></i>
          </div>
        ) : null}
        <span className="profileWrapper">
          <ProfileImage userName={user.name} color={user.color} />
        </span>
        <h4 className="text-dark userName">
          {user.name}
          <br />
          <p className="userRole">{user.role}</p>
        </h4>
      </div>
    </div>
  );
};

export default InfoBar;
