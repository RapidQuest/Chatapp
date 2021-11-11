import React from "react";
import "./style.css";

export default function ProfileImage({ user }) {
  function getFirstString(name) {
    const firstL = name[0].charAt(0).toUpperCase();
    const secondL = name[1].charAt(0).toUpperCase();
    return firstL + secondL;
  }

  return (
    <div className={"tag " + user.color} id="profileImage">
      {user.name.split(" ").length > 1
        ? getFirstString(user.name.split(" "))
        : user.name.charAt(0).toUpperCase()}
    </div>
  );
}
