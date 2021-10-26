  
import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message';

import './style.css';

const Messages = ({ messages, id }) => {
  console.log(messages);
  return (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} id={id}/>{}</div>)}
  </ScrollToBottom>
)}

export default Messages;