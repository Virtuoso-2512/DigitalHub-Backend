const express = require("express");
const router = express.Router();
const Subject = require("../models/subject");
const tryCatch = require("../utils/tryCatch");

tryCatch(router, "create", 1, async(req, res) => {
    if(req.session.access !== 0) return res.send({success:false})
    const bt = await Subject.create(req.body);
    if(bt._id) return res.send({success:true});
});

tryCatch(router, ":batch", 0, async(req, res) => { 
    const subjects = await Subject.find({ batch:req.params.batch }, "name code").sort({name:"asc"});
    return res.send({subjects})
});

tryCatch(router, ":id/change", 0, async(req, res) => {
    const subjects = await Subject.findByIdAndUpdate(req.params.id, { [req.query.f]:req.query.v }); 
    return res.send({success:true});
});

module.exports = router;