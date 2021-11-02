const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

var current = new Date();

// create express app
const  app = express();

require("./db");

// Import API route
var routes = require('./router'); //importing route

const PORT = process.env.PORT || 5000;
const { addUser,createChat, login, joinUser, removeUser, getUser, getUsersInRoom } = require('./users')
// const router = require("./router");

const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.get('/', (req, res) => {
res.send("Hello World");
});

routes(app);
app.listen(port, () => {

console.log(`Server running at http://localhost:${port}`);
});


// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);
 
// app.use(cors());
// app.use(router);
// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// io.on("connect", (socket) => {
//   socket.on("join", ({ name,room  }, callback) => {
//     const { error, user } = joinUser({ id: socket.id, name, room });

//     if(error) return callback(error);
//     socket.join(user.room);

//     // socket.emit('message', { sentBy: 'admin', time: current.toLocaleString(), value: `${user.name}, welcome to room ${user.room}.`});
//     // socket.broadcast.to(user.room).emit('message', {value: message, time: current.toLocaleString(), sentBy: currentUser.id});

//     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//     callback();
//   });

//   socket.on("sendMessage", (message, callback) => {
//     const user = getUser(socket.id);
//     io.to(user.room).emit("message", { value: message, time: current.toLocaleString(), sentBy: user.name });
//     // io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

//     callback();
//   });

//   socket.on("disconnect", (socket) => {
//     const user = removeUser(socket.id);

//     if (user) {
//       io.to(user?.room).emit("message", { user: "Admin", text: `${user.name} has left.` });
//       io.to(user?.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
//     }
//   });
// });

// server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
