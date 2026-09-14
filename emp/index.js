const express = require("express");
const { Employee } = require("../models/stu_emp");
const tryCatch = require("../utils/tryCatch");
const router = express.Router();

const masterExplore = {
    crm:{
        title:"CRM",
        text:"Customer relationship management to manage all your leads",
        btnText:"Manage",
        link:"crm/leads",
        icon:"user-tag"
    }
}

tryCatch(router, "explore", 0, async(req, res) => {
    const ssRef = await Employee.findById(req.session.user, "post").populate("post", "permissions");

    var options = [
        {icon:"calendar-days", title:"Calendar",btnText:"", link:"/calendar"},
        // {icon:"message", title:"Connect", btnText:"", link:"/connect"},
        {icon:"book", title:"Classrooms", btnText:"", link:"/classrooms"},
        {icon:"wallet", title:"Salary", btnText:"", link:"/salary"},
        
    ];
    if(ssRef?.post?.permissions?.crm?.view || ssRef?.post?.permissions?.crm?.manage) options.push(masterExplore.crm);

    return res.send({options});
})

tryCatch(router, "permissions", 0, async(req, res) => {
    const ssRef = await Employee.findById(req.session.user, "post teacher").populate("post", "permissions");
    return res.send({permissions:ssRef?.post?.permissions, role:ssRef.teacher});
})

router.use("/auth/", require("../auth/index"));
router.use("/calendar/", require("../calendar.js"));
router.use("/profile/", require("./profile"));
router.use("/division/", require("./division"));
router.use("/batch/", require("./batch"));
router.use("/static/", require("../static"));
router.use("/crm/", require("../sa/crm"));

module.exports = router;