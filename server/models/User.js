const mongoose = require('mongoose');
const {userSchema}=require('./dbName')

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// export model user with UserSchema
module.exports = mongoose.model(userSchema, UserSchema);
