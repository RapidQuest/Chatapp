  
import React from 'react';
import ProfileImage from '../ProfileImage';

import './InfoBar.css';

const InfoBar = ({ user ,room }) => {
    let styles = {
      color: '#000',
      fontSize: '1.5rem',
    }

    return (<div className="infoBar">
      <div className="leftInnerContainer">
        <div className="backButton"><i class="fas fa-chevron-left" style={styles}></i></div>
        <ProfileImage user={user}/>
        <h4 className="text-dark userName">{user.name}<br/><h6>{user.role}</h6></h4>
      </div>
    </div>);
  };

export default InfoBar;