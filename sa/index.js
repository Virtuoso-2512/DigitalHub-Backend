const express = require("express");
const adminSession = require("../models/session");
const tryCatch = require("../utils/tryCatch");
const {WaRouter} = require("./WhatsApp");
const router = express.Router();
const mail = require("../utils/mail");


tryCatch(router, "super", 0, async(req, res) => {
    const dt = parseInt(req.query.type) ? true :false;
    const SessionFind = dt ? await adminSession.findById(req.headers.authorisation, "institute superAdmin").populate("institute", "name") : await adminSession.findById(req.headers.authorisation, "superAdmin");
    
    return res.send(dt ? {super:SessionFind.superAdmin, name:SessionFind.institute.name, id:SessionFind.institute._id} : {super:SessionFind.superAdmin})
    
})

tryCatch(router, "explore", 0, async(req, res) => {
    return res.send({options:[
        {icon:"bank", title:"Your Institutes", btnText:"Manage", link:"/institute/manage"},
        {icon:"user-plus", title:"New Users", btnText:"Create", link:"/user/create"},
        {icon:"users-gear", title:"User Posts", btnText:"Manage", link:"/posts/manage"},
        {icon:"gift", title:"Refer", text:"Refer to others and get exciting benefits", btnText:"Refer Now", link:"/refer"},
        {icon:"address-card", title:"Group Institute Manager", btnText:"Configure", link:"/profile"},
        {icon:"user-tag", title:"CRM", text:"Customer relationship management, manage leads here", btnText:"Access Now", link:"/crm/dashboard"},
        {icon:"envelope", title:"Send Mail", text:"Send Personal Mails through this without sign-in problems", btnText:"Send Mail", link:"/send-mail"},
    ]})
})

tryCatch(router, "mail", 1, async(req, res) => {
    const mailsend = await mail(req.body.subject, req.body.email, req.body.salutation, req.body.body, "", "", "", req.body.reason)
    return res.send({success:true});
})

router.use("/auth/", require("../auth/index"));
router.use("/calendar/", require("../calendar.js"));
router.use("/static/", require("../static"));
router.use("/post/", require("./post"));
router.use("/branding/", require("./branding"));
router.use("/calendar/", require("./calendar"));
router.use("/user/", require("./user"));
router.use("/group/", require("./group"));
router.use("/crm/", require("./crm"));
router.use("/wa/", WaRouter);
router.use("/institute/", require("./institute"));

module.exports = router;