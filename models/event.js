const mongoose = require("mongoose");

const eventModel = mongoose.Schema({
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref: "Institute", required:true},
    name: {type:String, required:true},
    date: {type:Date, required:true},
    holiday:{
        employees:Boolean,
        students:Boolean,
    }
});

module.exports = mongoose.model("Event", eventModel)