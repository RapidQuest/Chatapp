const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const app = express();

const routes = require("./router");
const PORT = process.env.PORT || 5000;
require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
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

// socketio
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const io = socketio(server);

io.on("connect", (socket) => {
  socket.on("join", (chatId) => {
    socket.join(chatId);
  });

  socket.on("sendMessage", (message, senderUserId, chatId, messageId, type, fileName) => {
    socket
      .to(chatId)
      .emit("messageRecived", message, senderUserId, Date.now(), chatId, messageId, type, fileName);
  });
});

// file uploads
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const upload = multer({ dest: "files/" });

const { uploadFile, getFileStream } = require("./s3");

app.post("/file/upload", upload.single("file"), async (req, res) => {
  // const description = req.body.description;
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);

  // Deleteing file from server
  await unlinkFile(file.path);
  res.send({ filePath: `/file/${result.Key}` });
});

app.get("/file/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  res.set("Content-Type", "application/octet-stream");
  res.set("responseType", "blob");
  res.attachment(key);
  readStream.pipe(res);
});
