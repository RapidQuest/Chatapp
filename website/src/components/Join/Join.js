import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth"
import { Link, useHistory } from "react-router-dom"
import Sidebar from '../sideBar/sideBar';
// import {  Button,Alert } from "react-bootstrap"
// import TextContainer from '../textContainer/textContainer';

import './Join.css';

const Join = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const rooms = ['testRoom1','testRoom2','testRoom3'];
  const [room, setRoom] = useState('');
  const users = [user1]
  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    <div className="joinOuterContainer">
      {/* <div className="joinInnerContainer"> */}
        
      <Sidebar rooms={rooms} />
        {/* <h1 className="heading">Join</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong className="text-light">Email:</strong> <p className="text-light">{currentUser.email}</p>
        <Link to={`/Chat?room=${room}`}>
          <button className="button mt-20" type="submit">Chat Now!</button>
        </Link>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      <TextContainer options={rooms}/> 
      </div>*/}
      {/* </div> */}
    </div>
  )
}

export default Join;