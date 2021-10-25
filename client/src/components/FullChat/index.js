import React from 'react'
import Chat from '../Chat'
import './style.css'

export default function FullChat({ user }) {
  return (
    <div className="fullContainer">
      <Chat user={user}/>
    </div>
  )
}
