const express = require("express");
const router = express.Router();
const branding = require("../models/branding");
const tryCatch = require("../utils/tryCatch");

tryCatch(router, "", 0, async(req, res) => {
    if(isNaN(req.query.type)) return res.send({});

    const content = await branding.findOne({index:req.query.type}, "name icon");
    return res.send(content?.name ? content : {})
});

tryCatch(router, "save", 1, async(req, res) => {
    const content = await branding.findOne({index:parseInt(req.query.idx)}, "");

    if(content?._id){
        content[req.query.type] = req.query.value;
        content.save();
    } else await branding.create({[req.query.type]:req.query.value, index:req.query.idx});
    
    return res.send({success:true})
});

module.exports = router;