import React from 'react';
// import onlineIcon from '../../icons/onlineIcon.png';
import './textContainer.css';
import { Link } from "react-router-dom"

const TextContainer = ({ options }) => {
  // console.log(options.map((name,i) => (
  //                 `<div key=${i} className="activeItem ${name}">
  //                   ${name}
  //                   {/* <img alt="Online Icon" src={onlineIcon}/> */}
  //                 </div>`
  //               )));
  return (<div className="textContainer">
    {
      options
        ? (
          <div>
            <h1>Available rooms</h1>
            <div className="activeContainer">
              <h2>
                {options.map((name,i) => (
                <Link to={`/Chat?room=${name}`} key={i}>
                  <button className="button mt-20" type="submit">{name}</button>
                </Link>
                  // <div key={i} className="activeItem {name}">
                  //   {name}
                  //   {/* <img alt="Online Icon" src={onlineIcon}/> */}
                  // </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>)
};

export default TextContainer;