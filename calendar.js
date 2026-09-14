const express = require("express");
const tryCatch = require("./utils/tryCatch")
const router = express.Router();
const Event = require("./models/event");
const {Student} = require("./models/stu_emp");

tryCatch(router, "", 0, async(req, res) => {
    var usser;
    if(req.session.user) usser = await Student.findById(req.session.user, "institute");

    var year = new Date().getFullYear(), month = parseInt(req.query.month);
    if(month <= 3) year += 1;

    var search = {createdBy:usser?.institute || req.session.institute, date:{$lte: new Date(year, month+1, 0, 23, 59,59), $gte: new Date(year, month, 0, 23, 59,59)}};

    const events = await Event.find(search, "name date");
    return res.send({events});
})

tryCatch(router, "dt", 0, async(req, res) => {
    const event = await Event.findById(req.query.id, "holiday");
    return res.send(event.holiday);
})

tryCatch(router, "d", 0, async(req, res) => {
    const event = await Event.findByIdAndDelete(req.query.id);
    return res.send({success:true});
})

tryCatch(router, "", 1, async(req, res) => {
    const newEvent = await Event.create({...req.body, createdBy:req.session.institute});
    return res.send({success:true});
})

module.exports = router;