const express = require("express");
const router = express.Router();
const Division = require("../models/division");
const tryCatch = require("../utils/tryCatch");
const { Student, Employee } = require("../models/stu_emp");
const batch = require("../models/batch");
const Classwork = require("../models/classwork");

tryCatch(router, ":batch", 0, async(req, res) => { 
    const divisions = await Division.find({ batch:req.params.batch }, "name theme").sort({name:"asc"});
    return res.send({divisions})
});

tryCatch(router, "info/:id", 0, async(req, res) => {
    const div = await Division.findById(req.params.id, "name theme " + req.query.q).populate("batch", "name"); 
    return res.send(div);
});

tryCatch(router, ":id/classwork", 1, async(req, res) => {
    const cw = await Classwork.create({...req.body, user:req.session.user, division:req.params.id}); 
    return res.send({success:true});
});

tryCatch(router, ":id/classwork", 0, async(req, res) => {
    const cw = await Classwork.find({division:req.params.id}).sort({time:1  }); 
    return res.send(cw);
});

tryCatch(router, "eligible/:id", 0, async(req, res) => {
    var eli = false;

    if(parseInt(req.query.role) === 1){ // Vice Principal Validation
        const div2 = await Division.findById(req.params.id, "batch");
        const batch2 = await batch.findById(div2.batch, "department");

        const user3 = await Employee.findById(req.session.user, "department");
        
        //console.log(user3.department);
        //console.log(batch2.department);

        if(batch2.department.toString() === user3.department.toString()) eli = true;

    }else if(parseInt(req.query.role) === 3){ // Class Teacher Validation
        const div2 = await Division.findById(req.params.id, "classTeacher");
        
        if(div2.classTeacher.toString() === req.session.user.toString()) eli = true;
    }else return;

    return res.send({eli});
});

tryCatch(router, "stu/:div", 0, async(req, res) => { 
    const stu = await Student.find({division: req.params.div}, "pfp name " + req.query.v);
    return res.send({stu})
});

tryCatch(router, ":div/f", 0, async(req, res) => { 
    const div = await Division.findById(req.params.div, "-_id " + req.query.v);
    return res.send({div})
});

tryCatch(router, ":id/change", 0, async(req, res) => {
    const divisions = await Division.findByIdAndUpdate(req.params.id, { [req.query.f]:req.query.v }); 
    return res.send({success:true});
});

module.exports = router;