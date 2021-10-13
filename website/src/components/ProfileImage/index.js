import React from 'react'
import './profileImage.css'

export default function ProfileImage({ user }) {  var tagCount = 0;
  var tagClasses = {};
  function getFirstString(name){
    var firstL = name[0].charAt(0);
    var secondL = name[1].charAt(0);
    return firstL+secondL;
  };

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
    <div>
      <div className={"tag "+ profileColor(user._id)} id="profileImage">{
      user.name.split(' ').length>1 ?
      getFirstString(user.name.split(' '))
      : 
      user.name.charAt(0)
      }</div> 
    </div>
  )
}
