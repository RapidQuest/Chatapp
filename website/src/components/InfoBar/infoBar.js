  
import React from 'react';
import ProfileImage from '../ProfileImage';

import './InfoBar.css';

const InfoBar = ({ user ,room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <ProfileImage user={user}/>
      <h4 className="text-dark userName">{user.name}<br/><h6>{user.role}</h6></h4>
    </div>
  </div>
);

export default InfoBar;