import React from "react";
import "./style.css";

export default function ProfileImage({ userName, color }) {
  function getFirstString(name) {
    const firstL = name[0].charAt(0).toUpperCase();
    const secondL = name[1].charAt(0).toUpperCase();
    return firstL + secondL;
  }

  return (
    <div className={"tag " + color} id="profileImage">
      <span className="text">
        {userName?.split(" ").length > 1
          ? getFirstString(userName?.split(" "))
          : userName?.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
