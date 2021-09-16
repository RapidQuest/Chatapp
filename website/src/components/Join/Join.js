import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth"
import { Link, useHistory } from "react-router-dom"
import {  Button,Alert } from "react-bootstrap"
// import 'bootstrap/dist/css/bootstrap.min.css';

import './Join.css';

const Join = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  
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
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong className="text-light">Email:</strong> <p className="text-light">{currentUser.email}</p>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event)=>{setName(event.target.value)}}/>
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>{setRoom(event.target.value)}}/>
        </div>
        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/Chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      </div>
    </div>
  )
}

export default Join;