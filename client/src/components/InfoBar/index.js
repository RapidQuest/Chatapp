  
import React, { useState, useEffect } from "react";

import ProfileImage from '../ProfileImage';
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

import './style.css';

const InfoBar = ({ user ,room }) => {
    const { height, width } = useWindowDimensions();

    let styles = {
      color: '#000',
      fontSize: '1.5rem',
    }

    return (<div className="infoBar">
      <div className="leftInnerContainer">
        {user && width < 760
        ?
        <div className="backButton" id="backButton" onClick={()=>{window.location.reload();}}><i className="fas fa-chevron-left" id="back_icon" style={styles}></i></div> 
        : 
        null}
        <span className="profileWrapper">
          <ProfileImage user={user}/>
        </span>
        <h4 className="text-dark userName">{user.name}<br/><p className="userRole">{user.role}</p></h4>
      </div>
    </div>);
  };

export default InfoBar;