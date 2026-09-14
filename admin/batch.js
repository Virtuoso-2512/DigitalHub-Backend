const express = require("express");
const router = express.Router();
const Batch = require("../models/batch");
const tryCatch = require("../utils/tryCatch");
const { Student } = require("../models/stu_emp");

tryCatch(router, "create", 1, async(req, res) => {
    if(req.session.access !== 0) return res.send({success:false});

    const bt = await Batch.create({...req.body, institute:req.session.institute, createdBy:req.session._id});
    if(bt._id) return res.send({success:true});
});

tryCatch(router, "", 0, async(req, res) => {
    const {page} = req.query, perPage = 10;
 
    const batches = await Batch.find({ institute:req.session.institute }, "name department manager").populate("manager", "name").populate("department", "name").skip((page - 1) * perPage).limit(perPage).sort({name:"asc"}); 

    const total = await Batch.countDocuments({institute:req.session.institute});

    return res.send({batches,total:total})
});

tryCatch(router, ":id/change", 0, async(req, res) => {
    const batches = await Batch.findByIdAndUpdate(req.params.id, { [req.query.f]:req.query.v }); 
    return res.send({success:true});
});

tryCatch(router, "get", 0, async(req, res) => {
    const batches = await Batch.find({ institute:req.session.institute }, "name "+req.query.query).sort({name:"asc"}); 
    return res.send({batches})
});

tryCatch(router, "stu/:batch", 0, async(req, res) => { 
    const stu = await Student.find({batch: req.params.batch}, "name division " + req.query.v).populate("division", "name");
    return res.send({stu})
});

tryCatch(router, ":id", 0, async(req, res) => {
    if(!req.params.id) return res.send({success:false});
    
    const batches = await Batch.findById(req.params.id, "createdAt updatedAt -_id manager institute name type").populate("manager", "name").populate("department", "name").populate("institute", "name");
    return res.send(batches)
});

module.exports = router;