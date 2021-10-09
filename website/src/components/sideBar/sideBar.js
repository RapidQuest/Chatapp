import { useEffect, useState, memo, useRef } from 'react';
import SidebarChat from './SidebarChat';
import { useAuth } from "../../contexts/Auth"
import { Avatar, IconButton } from '@material-ui/core';
import { Message, PeopleAlt, Home, ExitToApp as LogOut, SearchOutlined, GetAppRounded, Add } from '@material-ui/icons';
// import db, { auth, createTimestamp } from "./firebase";
import { useStateValue } from './StateProvider';
import { NavLink, Route, useHistory, Switch } from 'react-router-dom';
// import algoliasearch from "algoliasearch";
import './Sidebar.css';
// import audio from './notification.mp3'

const index = algoliasearch("HGSCPXF5HH", "5dcbf917421397576df267019b9b4c87").initIndex('whatsappy-app');

function Sidebar({  rooms }) {
    const [mounted, setMounted] = useState(false);
    const [{ user, page, pathID }] = useStateValue();
    let history = useHistory();
    const notification = new Audio(audio);

    var Nav;
    if (page.width > 760) {
        Nav = (props) =>
            <div className={`${props.classSelected ? "sidebar__menu--selected" : ""}`} onClick={props.click}>
                {props.children}
            </div>
    } else {
        Nav = NavLink;
    }

    async function search(e) {
        if (e) {
            document.querySelector(".sidebar__search input").blur();
            e.preventDefault();
        }
        //console.log(result);
    }

    useEffect(() => {
        const data = {};
        chats.forEach(cur => {
            if (cur.unreadMessages || cur.unreadMessages === 0) {
                if ((cur.unreadMessages > prevUnreadMessages.current[cur.id] || !prevUnreadMessages.current[cur.id] && prevUnreadMessages.current[cur.id] !== 0) && pathID !== cur.id) {
                    notification.play();
                };
                data[cur.id] = cur.unreadMessages;
            };
        });
        prevUnreadMessages.current = data;
    }, [chats, pathID]);

    useEffect(() => {
        if (page.width <= 760 && chats && !mounted) {
            setMounted(true);
            setTimeout(() => {
                document.querySelector('.sidebar').classList.add('side');
            }, 10);
        };
    }, [chats, mounted]);

    return (
        <div className="sidebar" style={{
            minHeight: page.width <= 760 ? page.height : "auto"
        }}>
            <div className="sidebar__header">
                <div className="sidebar__header--left">
                    <Avatar src={user?.photoURL} />
                    <h4>{user?.displayName} </h4>
                </div>
                <div className="sidebar__header--right">
                    <IconButton onClick={() => {
                        if (pwa) {
                            console.log("prompting the pwa event")
                            pwa.prompt()
                        } else {
                            console.log("pwa event is undefined")
                        }
                    }} >
                        <GetAppRounded />
                    </IconButton>
                    <IconButton onClick={() => {
                        useAuth.signOut();
                        history.replace("/chats")
                    }} >
                        <LogOut />
                    </IconButton>

                </div>
            </div>

            <div className="sidebar__search">
                <form className="sidebar__search--container">
                    <SearchOutlined />
                    <input
                        placeholder="Search here.."
                        type="text"
                    />
                    <button style={{ display: "none" }} type="submit" onClick={search}></button>
                </form>
            </div>

            <div className="sidebar__menu">
                <Nav
                    to="/rooms"
                    activeClassName="sidebar__menu--selected"
                >
                    <div className="sidebar__menu--rooms">
                        <Message />
                        <div className="sidebar__menu--line"></div>
                    </div>
                </Nav>
            </div>

            {page.width <= 760 ?
                <>
                    <Switch>
                        <Route path="/rooms" >
                            <SidebarChat key="rooms" fetchList={fetchRooms} dataList={rooms} title="Rooms" path="/rooms" />
                        </Route>
                    </Switch>
                </>
                : null
            }
        </div>
    );
};

export default memo(Sidebar);
