const mongoose = require("mongoose");

const departmentModel = mongoose.Schema({
    name: {type:String, required:true},
    timetable:{type:Array, maxLength:15}, 
    type: {type:Number, max:2, required:true},
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref: "Session", required:true},
    institute: {type:mongoose.Schema.Types.ObjectId, ref: "Institute", required:true},
    manager: {type:mongoose.Schema.Types.ObjectId, ref: "User"}
}, {timestamps:true});

module.exports = mongoose.model("Department", departmentModel)