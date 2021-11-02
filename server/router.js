
module.exports = function(app) {
  var userFunctions = require('./controllerFunctions');

  app
  .route("/users/register")
  .post(userFunctions.createNewUser);

  app
  .route("/chats/createChat")
  .post(userFunctions.createNewChat);

  app
  .route("/users/login")
  .post(userFunctions.loginUser)

  app
  .route("/users/getUsers")
  .get(userFunctions.listAllUsers)

  app
  .route("/chats/getChat")
  .get(userFunctions.getChat)

  app
  .route("/users/updateUser")
  .put(userFunctions.updateUser)

  app
  .route("/users/deleteUser")
  .delete(userFunctions.deleteUser);
};