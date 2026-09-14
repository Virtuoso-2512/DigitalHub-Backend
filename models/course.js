const mongoose = require("mongoose");

const courseModel = mongoose.Schema({
    institute: {type:mongoose.Schema.Types.ObjectId, ref: "Institute", required:true},
    name: {type:String, required:true},
    disabled: {type:Boolean}
});

module.exports = mongoose.model("Course", courseModel)