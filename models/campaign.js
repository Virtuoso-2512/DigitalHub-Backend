const mongoose = require("mongoose");

const campaignModel = mongoose.Schema({
    name:String,
    disable:Boolean,
    institute: {type:mongoose.Schema.Types.ObjectId, ref: "Institute", required:true},
    form: {type:mongoose.Schema.Types.ObjectId, ref: "Form", required:true},
}, {timestamps:true});

module.exports = mongoose.model("Campaign", campaignModel)