const mongoose = require("mongoose");

const sessionModel = mongoose.Schema({
    ip: {type:String, required:true},
    loc: {type:String, required:true},
    os: {type:Number, required:true},
    systemName: {type:String, required:true},
    
    user: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    
    lead: {type:mongoose.Schema.Types.ObjectId, ref: "Lead"},
    
    access:Number, //Master Decider - IMPORTANT
    active:Boolean, //Master Decider - IMPORTANT

    //Institute Login Only
    institute: {type:mongoose.Schema.Types.ObjectId, ref: "Institute"},
    LoggedInAt: {type:Date}

}, {timestamps:true});

module.exports = mongoose.model("session", sessionModel)