const  mongoose = require("mongoose");

//Assign MongoDB connection string to Uri and declare options settings
var  uri = `mongodb://chatApp:asdfghjkl@cluster0-shard-00-00.8inzn.mongodb.net:27017,cluster0-shard-00-01.8inzn.mongodb.net:27017,cluster0-shard-00-02.8inzn.mongodb.net:27017/chatApp?ssl=true&replicaSet=atlas-pfz4bh-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Declare a variable named option and assign optional settings
const  options = {
useNewUrlParser:  true,
useUnifiedTopology:  true
};

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options).then(() => {
console.log("Database connection established!");
},
err  => {
{
console.log("Error connecting Database instance due to:", err);
}
});