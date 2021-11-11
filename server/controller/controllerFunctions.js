const User = require("../models/User");
const Chat = require("../models/Chats");

// DEFINE CONTROLLER FUNCTIONS

exports.listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.createNewUser = (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(user);
  });
};

exports.updateUser = async (req, res) => {
  await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json({ message: "User successfully deleted" });
  });
};

exports.createNewChat = (req, res) => {
  let newChat = new Chat(req.body);
  newChat.save((err, chat) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(chat);
  });
};

exports.getAllChats = (req, res) => {
  const chatsId = req.body.chatId;
  if (!chatsId) {
    res.status(400).send({ message: "Please provide chatId", status: "failed" });
    return;
  }

  Chat.find({ chatid: chatsId }, (err, chats) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(chats);
  });
};

exports.getChat = (req, res) => {
  Chat.findOne({ chatid: req.headers.id }, (err, chat) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(chat);
  });
};

exports.lastMessage = (req, res) => {
  Chat.findOne({ chatid: req.headers.id }, { messages: { $slice: -1 } }, (err, chat) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(chat);
  });
};

exports.getUser = (req, res) => {
  User.findOne({ _id: req.headers.id }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.updateChat = async (req, res) => {
  await Chat.findOneAndUpdate(
    { chatid: req.body.id },
    { $push: { messages: req.body.message } },
    { new: true },
    (err, chat) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(chat);
    }
  );
};
