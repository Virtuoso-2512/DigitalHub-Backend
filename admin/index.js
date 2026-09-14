const express = require("express");
const tryCatch = require("../utils/tryCatch");
const mail = require("../utils/mail");
const router = express.Router();

tryCatch(router, "explore", 0, async(req, res) => {
    return res.send({options:[
        {icon:"calendar-days", title:"Calendar", text:"Manage Institutes Calendar", btnText:"Manage", link:"/calendar"},
        {icon:"envelope", title:"Send Mail", text:"Send Personal Mails through this without sign-in problems", btnText:"Send Mail", link:"/send-mail"},
        {icon:"sitemap", title:"Departments", btnText:"Manage", link:"/department/manage"},
        {icon:"users-rectangle", title:"Batches", btnText:"Manage", link:"/batch/manage"},
        {icon:"user-plus", title:"New Users", btnText:"Create", link:"/user/create"},
        {icon:"user-tag", title:"CRM", text:"Customer relationship management, manage leads here", btnText:"Access Now", link:"/crm/dashboard"},
    ]})
})

tryCatch(router, "mail", 1, async(req, res) => {
    const mailsend = await mail(req.body.subject, req.body.email, req.body.salutation, req.body.body, "", "", "", req.body.reason)
    return res.send({success:true});
})

router.use("/auth/", require("../auth/index"));
router.use("/calendar/", require("../calendar.js"));
router.use("/user/", require("./user"));
router.use("/static/", require("../static"));
router.use("/institute/", require("./institute"));
router.use("/department/", require("./department"));
router.use("/subject/", require("./subject"));
router.use("/division/", require("./division"));
router.use("/batch/", require("./batch"));

module.exports = router;