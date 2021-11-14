const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const jwt = require("jsonwebtoken");

var current = new Date();

// create express app
const app = express();

require("./db");

// Import API route
var routes = require("./router"); //importing route

const PORT = process.env.PORT || 5000;
// const router = require("./router");

const bodyParser = require("body-parser");
const { join } = require("path");

const port = process.env.PORT || 5000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, "RESTfulAPIs", (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// const app = express();
// const server = http.createServer(app);
const io = socketio(server);

// app.use(cors());
// app.use(router);
// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

io.on("connect", (socket) => {
  socket.on("join", (chatId) => {
    socket.join(chatId);
  });

  socket.on("sendMessage", (message, senderUserId, chatId, messageId) => {
    socket.to(chatId).emit("messageRecived", message, senderUserId, Date.now(), chatId, messageId);
    // io.to(user.room).emit("message", { value: message, time: current.toLocaleString(), sentBy: user.name });
    // io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

    // callback();
  });

  //   socket.on("disconnect", (socket) => {
  //     const user = removeUser(socket.id);

  //     if (user) {
  //       io.to(user?.room).emit("message", { user: "Admin", text: `${user.name} has left.` });
  //       io.to(user?.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
  //     }
  //   });
});

// server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
