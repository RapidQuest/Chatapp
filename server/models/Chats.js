const mongoose = require("mongoose");
const ChatSchema = mongoose.Schema({
  chatid: {
    type: String,
    required: true,
    unique: true,
  },
  messages: {
    type: [Object],
    required: false,
  },
});

// export model user with UserSchema
module.exports = mongoose.model("Chats", ChatSchema);
