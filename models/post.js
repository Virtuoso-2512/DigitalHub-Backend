const mongoose = require("mongoose");

const postModel = mongoose.Schema({
    name: {type:String,required:true},
    permissions: {type:Object,required:true},
    type: {type:Number,required:true}
}, {timestamps:true});

module.exports = mongoose.model("Post", postModel)