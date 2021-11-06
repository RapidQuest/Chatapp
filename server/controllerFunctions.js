const  User = require("./models/User");
const  Chat = require("./models/Chats");

// DEFINE CONTROLLER FUNCTIONS

exports.loginUser = async (req, res) => {
  console.log(req.body);
  // const { email, password } = req.body;
  try {
		let user = await User.findOne({
			email: req.body.email,
		});
		if (!user)
			return res.status(400).json({
				message: 'User Not Exist',
			});


		const isMatch = await req.body.password == "123";
		if (!isMatch)
			return res.status(400).json({
				message: 'Incorrect Password !',
			});
      // console.log(user);
      res.status(200).json({loggedUser: user})
      
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Server Error',
		});
	}
};

exports.listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
  if (err) {
  res.status(500).send(err);
  }
  res.status(200).json(user);
  });
}

exports.createNewUser = (req, res) => {
  // console.log(req.body);
let  newUser = new User (req.body);
newUser.save((err, user) => {
if (err) {
res.status(500).send(err);
}
res.status(201).json(user);
});
};

exports.updateUser = async (req, res) => {
  console.log(req.body);
  await User.findOneAndUpdate({ _id:req.body._id }, req.body, { new:true }, (err, user) => {
if (err) {
res.status(500).send(err);
}
res.status(200).json(user);
});
};

exports.deleteUser = async ( req, res) => {
await  User.deleteOne({ _id:req.params.id }, (err) => {
if (err) {
return res.status(404).send(err);
}
res.status(200).json({ message:"User successfully deleted"});
});
};

exports.createNewChat = (req, res) => {
  console.log(req.body);
let  newChat = new Chat(req.body);
newChat.save((err, chat) => {
if (err) {
res.status(500).send(err);
}
res.status(201).json(chat);
});
};

exports.getChat = (req, res) => {
	console.log(req.headers.id);
  Chat.findOne({ chatid : req.headers.id }, (err, chat) => {
  if (err) {
  res.status(500).send(err);
  }
  res.status(200).json(chat);
  });
}

exports.getUser = (req, res) => {
	console.log(req.headers.id);
  User.findOne({ _id : req.headers.id }, (err, user) => {
  if (err) {
  res.status(500).send(err);
  }
  res.status(200).json(user);
  });
}

exports.updateChat = async (req, res) => {
  console.log(req.body.id);
  await Chat.findOneAndUpdate({ chatid:req.body.id }, { $push: { messages: req.body.message } }, { new:true }, (err, chat) => {
if (err) {
res.status(500).send(err);
}
res.status(200).json(chat);
});
};
