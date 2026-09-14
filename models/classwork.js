const mongoose = require("mongoose");

const classworkModel = mongoose.Schema({
    name: {type:String, required:true},
    desc: {type:String, required:true},
    sub: {type:mongoose.Schema.Types.ObjectId, ref: "Subject"},
    division: {type:mongoose.Schema.Types.ObjectId, ref: "Division"},
    attach: [
        {name:String, icon:Number, id: {type:mongoose.Schema.Types.ObjectId, ref: "File"}}
    ],
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    time: {type:Date, required:true, default:Date.now()},
});

module.exports = mongoose.model("Classwork", classworkModel)