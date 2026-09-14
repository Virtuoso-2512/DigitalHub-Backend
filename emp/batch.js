const express = require("express");
const router = express.Router();
const Batch = require("../models/batch");
const Subject = require("../models/subject");
const {Employee} = require("../models/stu_emp");
const tryCatch = require("../utils/tryCatch");

tryCatch(router, "", 0, async(req, res) => {
    const user = await Employee.findById(req.session.user, "department department2");

    const batches = await Batch.find({ department:user.department }, "name").sort({name:"asc"}), batches2 = await Batch.find({ department:user.department2 }, "name").sort({name:"asc"}); 

    return res.send({batches:[...batches, ...batches2]})
});

tryCatch(router, "subjects/:div", 0, async(req, res) => { 
    const subs = await Subject.find({batch:req.params.div}, "name");
    return res.send({subs});
});

tryCatch(router, ":id/change", 0, async(req, res) => {
    const batches = await Batch.findByIdAndUpdate(req.params.id, { [req.query.f]:req.query.v }); 
    return res.send({success:true});
});

module.exports = router;