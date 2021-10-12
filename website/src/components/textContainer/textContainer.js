import React from 'react';
// import onlineIcon from '../../icons/onlineIcon.png';
import './tags.css';
import './textContainer.css';
import { Link } from "react-router-dom"
import $ from 'jquery';

const TextContainer = ({ fetchUsers,selectedUser }) => {
  var tagCount = 0;
  var tagClasses = {};
  function getFirstString(name){
    var firstL = name[0].charAt(0);
    var secondL = name[1].charAt(0);
    return firstL+secondL;
  };

  function setSelectedUser(id){
    
  }

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
  // console.log(options.map((name,i) => (
  //                 `<div key=${i} className="activeItem ${name}">
  //                   ${name}
  //                   {/* <img alt="Online Icon" src={onlineIcon}/> */}
  //                 </div>`
  //               )));
  return (
      fetchUsers
        ? (
          <div className="block_item_container">
              <h2>
                {fetchUsers.map((user,i) => (
                // <Link to={`/Chat?room=${name}`} key={i} style={{ textDecoration: 'none' }}>
                  <div className="block_item btn" onClick={()=>{setSelectedUser(user._id)}} key={i}>
                    <div className="row">
                      <div className="col-2">
                        <div className={"tag "+ profileColor(user._id)} id="profileImage">{
                        user.name.split(' ').length>1 ?
                        getFirstString(user.name.split(' '))
                        : 
                        user.name.charAt(0)
                        }</div> 
                      </div>
                      <div className="col-10">
                        <div className="row">
                          <p className="mt-2 col-8 item_name">{user.name}</p>
                          <p className="mt-2 col-4 item_role">{user.role}</p>
                        </div>
                        <p className="lastMessage">{user.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                // </Link>
                  // <div key={i} className="activeItem {name}">
                  //   {name}
                  //   {/* <img alt="Online Icon" src={onlineIcon}/> */}
                  // </div>
                ))}
              </h2>
          </div>
        )
        : null
    )
};

export default TextContainer;