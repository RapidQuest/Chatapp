import React from 'react';
// import onlineIcon from '../../icons/onlineIcon.png';
import './tags.css';
import './UsersList.css';
import ProfileImage from '../ProfileImage';

const UsersList = ({ fetchUsers,selectedUser }) => {

  return (
      fetchUsers
        ? (
          <div className="block_item_container" id="items">
              <h2>
                {fetchUsers.map((user,i) => (
                  <div className="block_item btn" onClick={()=>{selectedUser(user)}} key={i}>
                    <div className="row">
                      <div className="col-2">
                        <ProfileImage user={user}/>
                      </div>
                      <div className="col-10">
                        <div className="row">
                          <h6 className="mt-2 col-8 item_name">{user.name}</h6>
                          <p className="mt-2 col-4 item_role">{user.role}</p>
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