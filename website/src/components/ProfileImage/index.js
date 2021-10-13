import React from 'react'
import './profileImage.css'

export default function ProfileImage({ user,color }) {  
  
  function getFirstString(name){
    var firstL = name[0].charAt(0);
    var secondL = name[1].charAt(0);
    return firstL+secondL;
  };

  return (
    <div>
      <div className={"tag "+ color} id="profileImage">{
      user.name.split(' ').length>1 ?
      getFirstString(user.name.split(' '))
      : 
      user.name.charAt(0)
      }</div> 
    </div>
  )
}
