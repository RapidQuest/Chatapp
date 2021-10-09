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
  const endPoint = 'localhost:3000';

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
    const { name, room } = {name: currentUser.email, room: queryString.parse(location.search).room};
    socket = io(endPoint, { transports : ['websocket'] });

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        // alert(error);
      }
    });
  },[endPoint, currentUser.email,location.search]);

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
    <div className="app" style={{ ...page }} >
      {page.width <= 760 ?
        <Redirect to="/chats" />
        : <Redirect to="/" />}
      {!user && !loader && !checkingVersion && !updating ?
        <Login />
        : user && !updating && chatsFetched ?
          <div className="app__body">
            <Sidebar chats={chats} pwa={pwaEvent} rooms={rooms} fetchRooms={fetchRooms} users={users} fetchUsers={fetchUsers} />
            <TransitionGroup component={null} >
              {page.width <= 760 ?
                <Transition
                  key={location.pathname.replace("/image", "")}
                  timeout={260}
                >
                  {state => (
                    <Route location={location} path={`${path}/room/:roomID`}>
                      <Chat
                        b={b}
                        unreadMessages={chats?.length > 0 ? chats.find(cur => cur.id === pathID)?.unreadMessages : 0}
                        animState={state}
                      />
                    </Route>
                  )}
                </Transition>
                :
                <CSSTransition
                  key={location.pathname.replace("/image", "")}
                  timeout={1010}
                  classNames="page"
                >
                  {state => (
                    <Route location={location} path={`${path}/room/:roomID`}>
                      <Chat
                        b={b}
                        unreadMessages={chats?.length > 0 ? chats.find(cur => cur.id === pathID)?.unreadMessages : 0}
                        animState={state}
                      />
                    </Route>
                  )}
                </CSSTransition>
              }
            </TransitionGroup>
          </div> :
          <div className="loader__container">
            <CircularProgress />
          </div>
      }
    </div>
  );
  // return (
  //   <div className="outerContainer">
  //     <div className="containerC">
  //         <InfoBar room={room} />
  //         <Messages messages={messages} name={name} />
  //         <Input message={message} setMessage={xsetMessage} sendMessage={sendMessage} />
  //     </div>
  //     <div className="text-center mt-2">
  //       <Button variant="link" onClick={handleLogout}>
  //         Log Out
  //       </Button>
  //     </div>
  //     {/* <TextContainer users={users}/> */}
  //   </div>
  // )
}

export default Chat;