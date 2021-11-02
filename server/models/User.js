const mongoose = require('mongoose');
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
		required: false
	}
});

// export model user with UserSchema
module.exports = mongoose.model("Users", UserSchema);
