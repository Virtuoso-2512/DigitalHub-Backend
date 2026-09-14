const mongoose = require("mongoose");

const connectToDB = async() => {
    mongoose.set('strictQuery', false);
    await mongoose.connect("mongodb://127.0.0.1:27017/digitalHub?directConnection=true",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })

    console.log("Established a connection with the Database !!\n");
}

module.exports = connectToDB