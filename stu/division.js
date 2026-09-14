const express = require("express");
const router = express.Router();
const tryCatch = require("../utils/tryCatch");
const { Student } = require("../models/stu_emp");
const division = require("../models/division");

tryCatch(router, "", 0, async(req, res) => { 
    const stu = await Student.findById(req.session.user, "division");

    const div = await division.findById(stu.division, "name theme " + req.query.q).populate("batch", "name"); 
    return res.send(div);
});

tryCatch(router, "stu/:div", 0, async(req, res) => { 
    const stu = await Student.find({division: req.params.div}, "pfp name " + req.query.v);
    return res.send({stu})
});

module.exports = router;