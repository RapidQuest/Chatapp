import React, {useState, useEffect} from "react";
import { useAuth } from "../../contexts/Auth"
import io from "socket.io-client"; 
import {  useHistory } from "react-router-dom"

import InfoBar from '../InfoBar';
import Input from '../Input';
import Messages from '../Messages';
import './style.css'

let socket;

export default function FullChat({ user,selectedUser }) {
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
  var current = new Date();

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

    socket.emit('join', { user, currentUser }, (error) => {
      if(error) {
        // alert(error);
      }
    });
  },[endPoint, user._id]);

//   useEffect(() => {
//     socket.on('message', message => {
//       setMessages(messages => [...messages, message]);
//       if(existingMessages == null) localStorage.setItem(user._id, JSON.stringify(message));
//     });
// }, [user]);

  useEffect(() => {
    setMessages("")
    const message = [{ sentBy: currentUser.name, time: current.toLocaleString(), value: user.name + ", Welcome " + user._id}]
    setMessages(messages => [...messages, message]);
    if(existingMessages == null) localStorage.setItem(user._id, JSON.stringify(message));
     
}, [user]);

const sendMessage = (event) => {
  event.preventDefault();

  // if(message) {
  //   socket.emit('sendMessage', message, () => {

  //     setMessages(messages => [...messages, [{value: message, time: current.toLocaleString(), sentBy: currentUser.id}]]);
  //     setMessage("")
  //     if(existingMessages == null){
  //       existingMessages = [];
  //       localStorage.setItem(user._id, JSON.stringify(messages)); 
  //     }
      
  //     existingMessages.push({value: message, time: current.toLocaleString(), sentBy: currentUser.id})
    
  //     localStorage.setItem(user._id, JSON.stringify(existingMessages))
    
  //   });
  // }

  setMessages(messages => [...messages, {value: message, time: current.toLocaleString(), sentBy: currentUser.id}]);
  setMessage("")
  if(existingMessages == null){
    existingMessages = [];
    localStorage.setItem(user._id, JSON.stringify(messages)); 
  }
  
  existingMessages.push({value: message, time: current.toLocaleString(), sentBy: currentUser.id})

  localStorage.setItem(user._id, JSON.stringify(existingMessages))
  console.log(existingMessages);


  if(message) {
    socket.emit('sendMessage', message, () => setMessage(''));
  }
}
user.messages = JSON.parse(localStorage.getItem(user._id))

let allMessages =  (user.messages==null? messages: user.messages);


  return (
    <div className="fullContainer">
    <div className="outerContainer">
      <div className="containerC" id={user._id}>
          <InfoBar user={user} room={room} setUser={selectedUser} />
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
