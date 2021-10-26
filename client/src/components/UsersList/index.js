import React, {useState, useEffect} from 'react';
// import onlineIcon from '../../icons/onlineIcon.png';
import './tags.css';
import './style.css';
import ProfileImage from '../ProfileImage';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const UsersList = ({ fetchUsers,selectedUser }) => {
  const { height, width } = useWindowDimensions();

  function Onselect(){
    let elements = document.getElementsByClassName('block_item btn activeClass');
    for(let i=0;i<elements.length;i++){
      elements[i].classList.remove("activeClass");
    }
  }


  return (
      fetchUsers
        ? (
          <div className="block_item_container" id="items">
              <h2>
                {fetchUsers.map((user,i) => (
                  <div className="block_item hover btn" id={user._id} onClick={()=>{
                    selectedUser(user);
                    Onselect();
                    document.getElementById(user._id).classList.add("activeClass");
                    }} key={i}>
                    <div className="row">
                      <div className={width<=760? "col-1" : "col-2" }>
                        <ProfileImage user={user}/>
                      </div>
                      <div className={width<=760? "col-11 leftPadInMob" : "col-10 leftPadInMob" }>
                        <div className="row paddingTop">
                          <h6 className="col-8 item_name">{user.name}</h6>
                          <p className="col-4 item_role">{user.role}</p>
                        </div>
                        <p className="lastMessage">{user.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </h2>
          </div>
        )
        : null
    )
};

export default UsersList;