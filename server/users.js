const User = require("./models/User");
const users = [];

const addUser = async (item, db, response) => {
  let user = await db.findOne({
    $or: [{ email: item.email }],
  });
  if (user) {
    return response.status(400).json({
      msg: "User Already Exists",
    });
  }
  // return updated list
  db.find().toArray((_error, _result) => {
    // callback of find
    if (_error) throw _error;
    response.json(_result);
  });
};

const login = async (req, res, db, allUsers) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    const isMatch = (await password) == user.password;
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });
    console.log(user);
    res.status(200).json({ id: user._id, allUsersData: allUsers, loggedUser: user });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const createChat = async (req, res, db) => {
  const { chatId, currentUser, chatWith } = req.body;

  try {
    let user1 = await User.findById(currentUser._id, function (err, data) {
      console.log(data);
    });
    // let user1 = await User.findOne({
    //   $or: [{ email: currentUser.email }],
    // });
    // if (!user1)
    // 	return res.status(400).json({
    // 		message: 'User Not Exist',
    // 	});
    // console.log(user1);
    // res.status(200).json({id:user._id, allUsersData :allUsers, loggedUser: user})
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getUser = async (req, res, db) => {
  try {
    console.log(req.headers.token);
    const id = req.headers.token;
    console.log(db);
    const user = await db.findById(id, function (error, data) {
      res.json(data);
    });

    console.log(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
    console.log(e);
  }
};

const joinUser = ({ id, name, room }) => {
  // name = name.trim().toLowerCase();
  // room = room.trim().toLowerCase();

  const existingUsers = users.find((user) => user.room === room && user.name === name);

  if (existingUsers) return { error: "Username is taken." };

  const user = { id, name, room };

  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

// const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  getUser,
  createChat,
  addUser,
  login,
  joinUser,
  removeUser,
  getUsersInRoom,
};
