const mongoose = require('mongoose');
const {userSchema}=require('./dbName')

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique:true
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true
	},
	chatId: {
		type: [String],
		unique: false,
	},
});

// export model user with UserSchema
module.exports = mongoose.model(userSchema, UserSchema);
