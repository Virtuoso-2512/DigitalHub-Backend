const mongoose = require("mongoose")

const batchModel = mongoose.Schema({
    name: {type:String, required:true, unique:true},
    subjects:{type:Array, maxLength:15}, 
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref: "Session", required:true},
    institute: {type:mongoose.Schema.Types.ObjectId, ref: "Institute", required:true},
    department: {type:mongoose.Schema.Types.ObjectId, ref: "Department", required:true},
    manager: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    divisions:[{type:mongoose.Schema.Types.ObjectId, ref: "Division"}]
}, {timestamps: true});

module.exports = mongoose.model("Batch", batchModel)