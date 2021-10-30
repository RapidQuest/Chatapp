const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

var current = new Date();

const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');
const { addUser, login, joinUser, removeUser, getUser, getUsersInRoom } = require('./users')
const router = require("./router");
const db = require("./db");
const { log } = require("console");
const dbName = "chatApp";
const collectionName = "users";
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  dbCollection.find().toArray(function(err, result) {
      if (err) throw err;
        console.log(result);
  });

  // << db CRUD routes >>
  app.post("/users/register", (request, response) => {
    const item = request.body;
    dbCollection.insertOne(item, (error, result) => { // callback of insertOne
        if (error) throw error;
        addUser(item, dbCollection,response);
    });

  });
  app.post("/users/login", (req, res) =>{
    login(req, res, dbCollection)
  });
  app.get("/users/", (req,res) => {
    getUser(req, res, dbCollection);
  });

}, function(err) { // failureCallback
  throw (err);
});


const app = express();
const server = http.createServer(app);
const io = socketio(server);
 
app.use(cors());
app.use(router);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

io.on("connect", (socket) => {
  socket.on("join", ({ name,room  }, callback) => {
    const { error, user } = joinUser({ id: socket.id, name, room });

    if(error) return callback(error);
    socket.join(user.room);

    // socket.emit('message', { sentBy: 'admin', time: current.toLocaleString(), value: `${user.name}, welcome to room ${user.room}.`});
    // socket.broadcast.to(user.room).emit('message', {value: message, time: current.toLocaleString(), sentBy: currentUser.id});

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { value: message, time: current.toLocaleString(), sentBy: user.name });
    // io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on("disconnect", (socket) => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user?.room).emit("message", { user: "Admin", text: `${user.name} has left.` });
      io.to(user?.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
