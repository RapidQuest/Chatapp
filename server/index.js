const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const app = express();

const routes = require("./router");
const PORT = process.env.PORT || 5000;
require("./db");

const bodyParser = require("body-parser");
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

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const io = socketio(server);

io.on("connect", (socket) => {
  socket.on("join", (chatId) => {
    socket.join(chatId);
  });

  socket.on("sendMessage", (message, senderUserId, chatId, messageId) => {
    socket.to(chatId).emit("messageRecived", message, senderUserId, Date.now(), chatId, messageId);
  });
});
