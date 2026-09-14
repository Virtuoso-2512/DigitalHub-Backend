const express = require("express");
const router = express.Router();
const institute = require("../models/institute");
const tryCatch = require("../utils/tryCatch");

tryCatch(router, "name", 0, async(req, res) => {
    if(!req.query.value) return res.send({success:false});
    
    const institutes = await institute.findByIdAndUpdate(req.session.institute, {name:req.query.value});
    return res.send({success:true});
});

tryCatch(router, "profile", 0, async(req, res) => {
    const institutes = await institute.findById(req.session.institute, req.query.query);
    return res.send(institutes);
});

tryCatch(router, "icon", 0, async(req, res) => {
    const institutes = await institute.findById(req.session.institute, "icon");
    return res.send(institutes);
});

module.exports = router;