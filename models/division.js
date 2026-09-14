const mongoose = require("mongoose")

const divisionModel = mongoose.Schema({
    name:{type:String, required:true},
    theme:{type:Number, min:0, max:10},
    classTeacher: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    batch: {type:mongoose.Schema.Types.ObjectId, ref: "Batch",required:true}
});

module.exports = mongoose.model("Division", divisionModel)