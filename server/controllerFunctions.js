const  User = require("./models/User");

// DEFINE CONTROLLER FUNCTIONS

exports.loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
		let user = await User.findOne({
			email,
		});
		if (!user)
			return res.status(400).json({
				message: 'User Not Exist',
			});

		const isMatch = await password == user.password;
		if (!isMatch)
			return res.status(400).json({
				message: 'Incorrect Password !',
			});
      console.log(user);
      res.status(200).json({loggedUser: user})
      
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Server Error',
		});
	}
};

exports.listAllUsers = async (req, res) => {
  User.find({}, (err, user) => {
  if (err) {
  res.status(500).send(err);
  }
  res.status(200).json(user);
  });
}

exports.createNewUser = (req, res) => {
  console.log(req.body);
let  newUser = new User (req.body);
newUser.save((err, user) => {
if (err) {
res.status(500).send(err);
}
res.status(201).json(user);
});
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, user) => {
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