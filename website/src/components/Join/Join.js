import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth"
import { Link, useLocation, useHistory } from "react-router-dom"
import {  Button,Alert } from "react-bootstrap"
import TextContainer from '../textContainer/textContainer';
import { TransitionGroup } from "react-transition-group";

import './Join.css';

const Join = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const location = useLocation();
  const history = useHistory()
  const rooms = ['Ajit Chougule','Alex Carry','Arya Stark','Ashwini Chougule','Colin Sik','Jack Aranda','John Quil','Manny Jah','Olive Yew','Rose Bush'];
  const [room, setRoom] = useState('');
  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  
  return (
    <div className="joinOuterContainer ">
      <div className="right_border">
        <div className="sideBar">
          <input className="searchInput mt-3 mb-2" style={{ fontFamily: "FontAwesome", fontSize: "20px"  }} placeholder='&#xf002;  Search here...'/>
          {/* <h1 className="heading">Join</h1> */}
            {error && <Alert variant="danger">{error}</Alert>}
            {/* <strong className="text-dark">Email:</strong> <p className="text-dark">{currentUser.email}</p> */}
          {/* <Link to={`/Chat?room=${room}`}>
            <button className="button mt-20" type="submit">Chat Now!</button>
          </Link> */}
          <div className="w-100 text-center mt-2">
            {/* <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button> */}
          <TextContainer options={rooms}/> 
          </div>
        </div>
      </div>
      {/* <div className="joinInnerContainer"> */}

    <div className="chatArea">
      <span className="description">
        <h1 className="docLogo"><i class="fas fa-user-md"></i></h1>
        <h1>Keep Yourself connected</h1>
      </span>
      
      {/* <TransitionGroup component={null} >
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
            </TransitionGroup> */}
    </div>
        
    </div>
  )
}

export default Join;