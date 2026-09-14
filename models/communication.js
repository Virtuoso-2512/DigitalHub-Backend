const mongoose = require("mongoose");

const communicationModel = mongoose.Schema({
    type:Boolean, //false for Mail, True for WhatsApp
    content:String,
    mail:String,
    phone:String,
    opened:Boolean,
    clicked:Boolean,
    created: {type:Date, default: new Date}
});

module.exports = mongoose.model("Communication", communicationModel)