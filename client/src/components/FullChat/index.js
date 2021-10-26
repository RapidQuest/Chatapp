import React, {useState, useEffect} from "react";
import { useAuth } from "../../contexts/Auth"
import io from "socket.io-client"; 
import {  Button } from "react-bootstrap"
import {  useHistory } from "react-router-dom"

import InfoBar from '../InfoBar';
import Input from '../input';
import Messages from '../messages';
import './style.css'

let socket;

export default function FullChat({ user }) {
  const { logout } = useAuth();
  const [error, setError] = useState("")
  const history = useHistory()
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const endPoint = 'localhost:5000';
  const currentUser = {id:2512, name:"Vanshaj"};
  let existingMessages = JSON.parse(localStorage.getItem(user._id));

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect(()=>{
    const { name, room } = {name: currentUser.name, room: user._id};
    socket = io(endPoint, { transports : ['websocket'] });

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        // alert(error);
      }
    });
  },[endPoint, user._id]);

  useEffect(() => {
    setMessages("")
    const message = [{ sentBy: currentUser.name, time:"today", value: user.name + ", Welcome " + user._id}]
    setMessages(messages => [...messages, message]);
    if(existingMessages == null) localStorage.setItem(user._id, JSON.stringify(message));
     
}, [user]);

const sendMessage = (event) => {
  event.preventDefault();
  setMessages(messages => [...messages, {value: message, time:"today", sentBy: currentUser.id}]);
  setMessage("")
  if(existingMessages == null){
    existingMessages = [];
    localStorage.setItem(user._id, JSON.stringify(messages)); 
  }
  
  existingMessages.push({value: message, time:"today", sentBy: currentUser.id})

  localStorage.setItem(user._id, JSON.stringify(existingMessages))
  console.log(existingMessages);


  // if(message) {
  //   socket.emit('sendMessage', message, () => setMessage(''));
  // }
}
user.messages = JSON.parse(localStorage.getItem(user._id))
console.log(messages);

let allMessages =  (user.messages==null? messages: user.messages);


  return (
    <div className="fullContainer">
    <div className="outerContainer">
      <div className="containerC" id={user._id}>
          <InfoBar user={user} room={room}  />
          <Messages messages={allMessages} id={currentUser.id} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <div className="text-center mt-2">
        {/* <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button> */}
      </div>
    </div>
    </div>
  )
}
