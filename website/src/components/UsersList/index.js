import React from 'react';
// import onlineIcon from '../../icons/onlineIcon.png';
import './tags.css';
import './UsersList.css';
import ProfileImage from '../ProfileImage';

const UsersList = ({ fetchUsers,selectedUser }) => {
  var tagCount = 0;
  var tagClasses = {};

  function profileColor(tagName){
    const tagColors = [ "lightpink", "mustdo", "agenda", "someday", "purple", "bronze", "aqua", "grey",
                        "silver", "brown", "cranberry", "orange", "brightorange", "peach", "maringold",
                        "lightgreen", "darkgreen", "teal", "lightblue", "darkblue", "lavender", "plum",
                        "lightgray", "darkgray",
                      ];
    if(tagClasses[tagName]) {
      return tagClasses[tagName]
    }
    tagClasses[tagName] = tagColors[tagCount]
    tagCount++;
    if(tagCount > tagColors.length) {
      tagCount = 0;
    }
    return tagClasses[tagName]
  };
  return (
      fetchUsers
        ? (
          <div className="block_item_container" id="items">
              <h2>
                {fetchUsers.map((user,i) => (
                  <div className="block_item btn" onClick={()=>{selectedUser(user)}} key={i}>
                    <div className="row">
                      <div className="col-2">
                        <ProfileImage user={user} color={profileColor(user._id)}/>
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