import React, {useState, useEffect} from "react";
import queryString from "query-string";
import { useAuth } from "../../contexts/Auth"
import io from "socket.io-client"; 
import {  Button } from "react-bootstrap"
import {  useHistory } from "react-router-dom"

import './Chat.css';
import InfoBar from '../InfoBar/infoBar';
import Input from '../input/input';
import Messages from '../messages/messages';
// import UsersList from '../UsersList/index';

let socket;

const Chat = ({ user }) => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("")
  const history = useHistory()
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const endPoint = 'localhost:5000';

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
    const { name, room } = {name: "Vanshaj", room: user._id};
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
    const message = {text: user.name + ", Welcome " + user._id, user: user._id}
    setMessages(messages => [...messages, message]);
}, [user]);

const sendMessage = (event) => {
  event.preventDefault();
  setMessages(messages => [...messages, {text: message, user: 10}]);
  setMessage("")
  // if(message) {
  //   socket.emit('sendMessage', message, () => setMessage(''));
  // }
}
  console.log(message, messages);
  return (
    <div className="outerContainer">
      <div className="containerC">
          <InfoBar user={user} room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <div className="text-center mt-2">
        {/* <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button> */}
      </div>
    </div>
  )
}

export default Chat;