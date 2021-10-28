  
import React from 'react';

import Message from '../Message';

import './style.css';

const Messages = ({ messages, id }) => {
  console.log(messages);
  return (
    <div className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} id={id}/>{}</div>)}
    </div>
)}

export default Messages;