const bodyParser = require("body-parser");

module.exports = function (app) {
  const userFunctions = require("./controller/controllerFunctions");
  const userHandlers = require("./controller/authController");

  app.route("/users/register").post(userHandlers.register);

  app.route("/chats/createChat").post(userFunctions.createNewChat);

  app.route("/users/login").post(userHandlers.login);

  app.route("/users/getUsers").get(userFunctions.listAllUsers);

  app.route("/chats/getChat").get(userFunctions.getChat);

  app.route("/chats/getAllChats").post(userFunctions.getAllChats);

  app.route("/chats/getUser").get(userFunctions.getUser);

  app.route("/chats/lastMessage").get(userFunctions.lastMessage);

  app.route("/users/updateUser").put(userFunctions.updateUser);

  app.route("/users/updateChat").put(userFunctions.updateChat);

  app.route("/users/deleteUser").delete(userFunctions.deleteUser);
};
