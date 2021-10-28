  
import React from 'react';

import Message from '../Message';

import './style.css';

const Messages = ({ messages, id }) => {
  console.log(messages);
  return (
    <>
    {messages.map((message, i) => <div key={i}><Message message={message} id={id}/>{}</div>)}
    </>
)}

export default Messages;