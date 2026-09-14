const express = require("express");
const router = express.Router();
const department = require("../models/department");
const tryCatch = require("../utils/tryCatch");
const { Employee } = require("../models/stu_emp");

tryCatch(router, "create", 1, async(req, res) => {
    if(req.session.access !== 0) return res.send({success:false});

    const dept = await department.create({...req.body, institute:req.session.institute, createdBy:req.session._id});
    if(dept._id) return res.send({success:true})
});

tryCatch(router, "", 0, async(req, res) => {
    const {page} = req.query, perPage = 10;
 
    const departments = await department.find({ institute:req.session.institute }, "name type").skip((page - 1) * perPage).limit(perPage).sort({name:"asc"}); 

    const total = await department.countDocuments({institute:req.session.institute});

    return res.send({departments,total:total})
});

tryCatch(router, "get", 0, async(req, res) => {
    const departments = await department.find({ institute:req.session.institute }, "name "+req.query.query).sort({name:"asc"}); 
    return res.send({departments})
});

tryCatch(router, ":id/change", 0, async(req, res) => {
    const departments = await department.findByIdAndUpdate(req.params.id, { [req.query.f]:req.query.v }); 
    return res.send({success:true});
});

tryCatch(router, "emp/:dept", 0, async(req, res) => { 
    const emp = await Employee.find({department: req.params.dept}, "name teacher pfp " + req.query.v);
    return res.send({emp})
});

tryCatch(router, ":id", 0, async(req, res) => {
    if(!req.params.id) return res.send({success:false});
    
    const departments = await department.findById(req.params.id, "createdAt updatedAt -_id manager institute name type").populate("manager", "name").populate("institute", "name");
    return res.send(departments)
});

module.exports = router;