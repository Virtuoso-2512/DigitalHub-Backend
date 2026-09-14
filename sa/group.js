const express = require("express");
const router = express.Router();
const institute = require("../models/institute");
const tryCatch = require("../utils/tryCatch");

tryCatch(router, "profile", 0, async(req, res) => {
    const groupInsti = await institute.findOne({main:"(default)"}, "-__v -createdAt -password");
    return res.send(groupInsti)
});

tryCatch(router, "profile", 1, async(req, res) => {
    const groupInsti = await institute.findOne({main:"(default)"}, "icon background");

    const groupInsti2 = await institute.findOneAndUpdate({main:"(default)"}, {icon:groupInsti.icon, background:groupInsti.background, ...req.body});
    return res.send({success:true})
});

tryCatch(router, "icon/:icon", 0, async(req, res) => {
    const groupInsti = await institute.findOneAndUpdate({main:"(default)"}, {icon:req.params.icon});
    return res.send({success:true});
});

tryCatch(router, "bg/:bg", 0, async(req, res) => {
    const groupInsti = await institute.findOneAndUpdate({main:"(default)"}, {background:req.params.bg});
    return res.send({success:true});
});


module.exports = router;