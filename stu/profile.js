const express = require("express");
const router = express.Router();
const {Student} = require("../models/stu_emp");
const tryCatch = require("../utils/tryCatch");

tryCatch(router, "", 1, async(req, res) => {
    const stu = await Student.findByIdAndUpdate(req.session.user, req.body);
    return res.send({success:true})
});

tryCatch(router, "personal", 0, async(req, res) => {
    const stu = await Student.findById(req.session.user, "-_id name email mobile dob gender bloodGroup religion caste category motherTongue nationality aadhar medHis address pin")
    return res.send(stu)
});

tryCatch(router, "family", 0, async(req, res) => {
    const stu = await Student.findById(req.session.user, "-_id m_name m_qual m_occ m_income m_mobile f_name f_qual f_occ f_income f_mobile sib_name sib_qual sib_gr emer_contact emer_mobile emer_contactRel")
    return res.send(stu)
});

module.exports = router;