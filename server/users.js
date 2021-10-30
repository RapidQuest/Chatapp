const users = [];

const addUser = async (item, db,response) => {
  let user = await db.findOne({
    $or: [{ email: item.email }],
  });
  if (user) {
    return response.status(400).json({
      msg: 'User Already Exists',
    });
  }
  // return updated list
  db.find().toArray((_error, _result) => { // callback of find
      if (_error) throw _error;
      response.json(_result);
  });

}
const joinUser = ({ id, name, room })=>{
  // name = name.trim().toLowerCase();
  // room = room.trim().toLowerCase();

  const existingUsers = users.find((user) => user.room === room && user.name === name);

  if(existingUsers) return { error: 'Username is taken.' };

  const user = { id, name, room };
  
  users.push(user);
  return { user };
};


const removeUser = (id)=>{
  const index = users.findIndex((user) => user.id === id);

  if(index != -1){
    return users.splice(index, 1)[0];
  }
};


const getUser = (id) => users.find((user) => user.id === id);


const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser ,joinUser, removeUser, getUser, getUsersInRoom };