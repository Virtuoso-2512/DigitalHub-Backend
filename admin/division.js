const express = require("express");
const router = express.Router();
const Division = require("../models/division");
const tryCatch = require("../utils/tryCatch");
const { Student } = require("../models/stu_emp");

tryCatch(router, "create", 1, async(req, res) => {
    const bt = await Division.create(req.body);
    if(bt._id) return res.send({success:true});
});

tryCatch(router, ":batch", 0, async(req, res) => { 
    const divisions = await Division.find({ batch:req.params.batch }, "name theme classTeacher").populate("classTeacher", "name").sort({name:"asc"});
    return res.send({divisions})
});

tryCatch(router, "stu/:div", 0, async(req, res) => { 
    const stu = await Student.find({division: req.params.div}, "pfp name " + req.query.v);
    return res.send({stu})
});

tryCatch(router, ":id/change", 0, async(req, res) => {
    const divisions = await Division.findByIdAndUpdate(req.params.id, { [req.query.f]:req.query.v }); 
    return res.send({success:true});
});

module.exports = router;