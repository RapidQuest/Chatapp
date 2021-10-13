import React from 'react'
import Chat from '../Chat/Chat'
import './style.css'

export default function FullChat({ user }) {
  return (
    <div className="fullContainer">
      <Chat user={user}/>
      {/* <h1>{user.name}</h1> */}
    </div>
  )
}
