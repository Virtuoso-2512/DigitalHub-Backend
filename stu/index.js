const express = require("express");
const tryCatch = require("../utils/tryCatch");
const router = express.Router();

tryCatch(router, "explore", 0, async(req, res) => {
    return res.send({options:[
        {icon:"chart-simple", title:"Attendance", text:"View Your Attendance stats and important insights", btnText:"View Attendance", link:"/classroom?a=1"},
        {icon:"calendar-check", title:"Timetable", text:"View Your Class Timetable to plan your week", btnText:"Access Timetable", link:"/classroom?a=2"},
        {icon:"bookmark", title:"Library", text:"Check Your Reading History", btnText:"Check Now", link:"/library"},
        {icon:"calendar-days", title:"Calendar",link:"/calendar"},
        {icon:"book", title:"Classroom", link:"/classroom"},
        {icon:"wallet", title:"Fees", link:"/fees"},
        {icon:"file-pen", title:"Forms", text:"An efficient way to collect data in a consolidated and detailed manner", btnText:"Access Forms", link:"/forms"},
        {icon:"pager", title:"Report Card", text:"Reports cards are a way to evaluate your Academic Progress", btnText:"View Report Card", link:"/report-card"},
    ]})
})

router.use("/auth/", require("../auth/index"));
router.use("/calendar/", require("../calendar.js"));
router.use("/batch/", require("./batch"));
router.use("/division/", require("./division"));
router.use("/profile/", require("./profile"));
router.use("/static/", require("../static"));

module.exports = router;