const mongoose = require("mongoose");

const leadLogsModel = mongoose.Schema({
  lead: {type:mongoose.Schema.Types.ObjectId, ref: "Lead", required:true},

  type:Number, //0 -> Mail, 1 -> WA, 2 -> FollowUp, 3 -> Notes, 4 -> Change in Lead Status, 5 -> Change in RM,  
  //title:String, Auto Controlled By Code according to TYPE

  description:String, //0, 1, 3(note description), 4, 5, 6

  added:{type:mongoose.Schema.Types.ObjectId, ref: "User"}, //2 -> Assigned to, 3 -> Added By

  //2
  due:Date,
  status:Boolean
  
}, {timestamps:true});

module.exports = mongoose.model("LeadLogs", leadLogsModel)