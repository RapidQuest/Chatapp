import React, {useState, useEffect} from "react";
// import queryString from "query-string";
import { useAuth } from "../../contexts/Auth"
import io from "socket.io-client"; 
import {  Button } from "react-bootstrap"
import {  useHistory } from "react-router-dom"

import './Chat.css';
import InfoBar from '../InfoBar/infoBar';
import Input from '../input/input';
import Messages from '../messages/messages';
import TextContainer from '../textContainer/textContainer';

let socket;

const Chat = ({ location }) => {
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
    const { name, room } = {name: currentUser.email, room: 'test'};
    console.log(currentUser.email);

    socket = io(endPoint, { transports : ['websocket'] });

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        // alert(error);
      }
    });
  },[endPoint, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
}, []);

const sendMessage = (event) => {
  event.preventDefault();

  if(message) {
    socket.emit('sendMessage', message, () => setMessage(''));
  }
}
  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="containerC">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <div className="text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <TextContainer users={users}/>
    </div>
  )
}

export default Chat;