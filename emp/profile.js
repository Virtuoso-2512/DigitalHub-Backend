const express = require("express");
const router = express.Router();
const {Employee} = require("../models/stu_emp");
const tryCatch = require("../utils/tryCatch");

tryCatch(router, "", 1, async(req, res) => {
    const stu = await Employee.findByIdAndUpdate(req.session.user, req.body);
    return res.send({success:true})
});

tryCatch(router, "f", 0, async(req, res) => {
    const stu = await Employee.findById(req.session.user, "-_id " + req.query.f)
    return res.send(stu)
});

tryCatch(router, "personal", 0, async(req, res) => {
    const stu = await Employee.findById(req.session.user, "-_id name email mobile dob gender bloodGroup religion caste category motherTongue nationality aadhar medHis address pin marital")
    return res.send(stu)
});

tryCatch(router, "identifications", 0, async(req, res) => {
    const stu = await Employee.findById(req.session.user, "-_id doj aadhar ifsc pan pf uan")
    return res.send(stu)
});

tryCatch(router, "family", 0, async(req, res) => {
    const stu = await Employee.findById(req.session.user, "-_id fn1 fr1 fno1 fn2 fr2 fno2 fn3 fr3 fno3 eName eRel eNo")
    return res.send(stu)
});

module.exports = router;