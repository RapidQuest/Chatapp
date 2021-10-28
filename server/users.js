const users = [];

const joinUsers = ({ id, userToChat, currentUser }) => {
  // name = name.trim().toLowerCase();
  // room = room.trim().toLowerCase();

  const existingUsers = users.find(
    (user) => user.userToChat === userToChat && user.currentUser === currentUser
  );

  if (existingUsers) return;

  const user = { id, userToChat, currentUser };

  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { joinUsers, removeUser, getUser, getUsersInRoom };
