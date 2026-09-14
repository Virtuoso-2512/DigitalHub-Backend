const mongoose = require("mongoose");

const fileModel = mongoose.Schema({
    link: {type:String, required:true},
    private: Boolean,
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("File", fileModel)