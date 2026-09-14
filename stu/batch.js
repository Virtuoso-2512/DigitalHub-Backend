const express = require("express");
const router = express.Router();
const tryCatch = require("../utils/tryCatch");
const { Student } = require("../models/stu_emp");

tryCatch(router, "", 0, async(req, res) => {
    const stu = await Student.findById(req.session.user, "batch").populate("batch", "name " + req.query.q);
    return res.send(stu.batch)
});

module.exports = router;