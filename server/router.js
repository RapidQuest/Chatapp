
module.exports = function(app) {
  var userFunctions = require('./controllerFunctions');

  app
  .route("/users/register")
  .post(userFunctions.createNewUser);

  app
  .route("/users/login")
  .post(userFunctions.loginUser)

  app
  .route("/users/getUsers")
  .get(userFunctions.listAllUsers)

  app
  .route("/users/updateUser")
  .put(userFunctions.updateUser)

  app
  .route("/users/deleteUser")
  .delete(userFunctions.deleteUser);
};