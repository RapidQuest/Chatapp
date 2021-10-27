const Mongoose = require('mongoose');

// let MongoClient = mongodb.MongoClient;

var url = "mongodb://localhost:27017/";
const initiateMongoServer = () => {
    Mongoose.connect(url,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    );
    console.log('Mongo Connection Success');
}

module.exports = initiateMongoServer