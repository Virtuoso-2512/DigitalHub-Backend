const mongoose = require("mongoose");

const subjectModel = mongoose.Schema({
    name: {type:String, required:true},
    code: {type:Number, required:true},
    batch: {type:mongoose.Schema.Types.ObjectId, ref: "Batch", required:true}
}, {timestamps:true});

module.exports = mongoose.model("Subject", subjectModel)