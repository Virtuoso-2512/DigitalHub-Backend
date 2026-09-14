const mongoose = require("mongoose");

const brandingModel = mongoose.Schema({
    index: {type:Number,required:true},
    name: String,
    icon: String
});

brandingModel.pre('save', async function(next) {
    const dd = await abc.countDocuments({});

    if(dd >= 3) return;

    this.index = isNaN(dd) ? 1 : dd+1;
    return next();
});

const abc = mongoose.model("Branding", brandingModel);

module.exports = abc