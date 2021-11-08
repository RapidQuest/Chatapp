// import User model
const User = require("../models/User");
    
// import jsonwebtoken
    jwt = require('jsonwebtoken'),

// import bcryptjs - hashing function 
bcrypt = require('bcryptjs');
    
//DEFINE CONTROLLER FUNCTIONS

// User Register function
    exports.register = (req, res) => {
    let newUser = new User(req.body);
        newUser.hash_password =     bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
    if (err) {
    res.status(500).send({ message: err });
    }
    user.hash_password = undefined;
    res.status(201).json(user);
    });
};

exports.login = async (req, res) => {
    try {
          let user = await User.findOne({
              email: req.body.email,
          });
          if (!user)
              return res.status(400).json({
                  message: 'User Not Exist',
              });
  
  
            if (!user.comparePassword(req.body.password))
              return res.status(400).json({
                  message: 'Incorrect Password !',
              });
              const payload = {
                  user: {
                    email: user.email, _id: user._id 
                  },
              };
        // console.log(user);
        res.status(200).json({loggedUser: user,
        token: jwt.sign(
			payload,
			'secret',
			{
				expiresIn: 3600,
			},
        )
        })
      } catch (e) {
          console.error(e);
          res.status(500).json({
              message: 'Server Error',
          });
      }
  };


  exports.loginRequired = (req, res, next) => {
if (req.user) {
res.json({ message: 'Authorized User, Action Successful!'});
    } else {
res.status(401).json({ message: 'Unauthorized user!' });
    }
};