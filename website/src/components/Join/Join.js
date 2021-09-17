import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth"
import { Link, useHistory } from "react-router-dom"
import {  Button,Alert } from "react-bootstrap"

import './Join.css';

const Join = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  
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
        <Link to={'/Chat'}>
          <button className="button mt-20" type="submit">Chat Now!</button>
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