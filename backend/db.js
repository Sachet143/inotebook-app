const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&directConnection=true";

mongoose.set('strictQuery', false);

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
    try {
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectToMongo;