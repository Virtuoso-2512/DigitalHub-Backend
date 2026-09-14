const express = require("express");
const institute = require("./models/institute");
const session = require("./models/session");
const router = express.Router();
const branding = require("./models/branding");
const tryCatch = require("./utils/tryCatch");
const communication = require("./models/communication");

tryCatch(router, "branding", 0, async(req, res) => {
    if(isNaN(req.query.type)) return res.send({});

    const content = await branding.findOne({index:req.query.type}, "name icon");
    return res.send(content?.name ? content : {})
});

router.get("/insti",async(req, res, next)=>{
    try{
        if(!req.query.id) {
            const insti = await institute.findOne({main:"(default)"}, "name icon background");
            return res.send({name:insti.name,icon:insti.icon,bg:insti.background,id:insti._id});
        }
    }catch(e){
        return res.send({success:false});
    }
});

router.get("/sessions", require("./middleware/active"), async(req, res, next)=>{
    try{
        var query = {};
        //find type of user
        if(req.session.lead) query = {lead:req.session.lead}
        else if(req.session.user) query = {user:req.session.user}
        else query = {institute:req.session.institute}

        const today = new Date();
        query = {...query, createdAt: { $gt: new Date(today.getTime() - 2419200000 /*Subtract 28 days*/) }};

        const sessions = await session.find(query,"active LoggedInAt os").sort({LoggedInAt:-1});
        return res.send({sessions})
    }catch(e){
        return res.send({success:false});
    }
});

router.get("/session/logout/:id", require("./middleware/active"), async(req, res, next)=>{
    try{
        const sessionUni = await session.findByIdAndUpdate(req.params.id, {active:false});
        return res.send({success:true})
    }catch(e){
        return res.send({success:false});
    }
});

router.get("/tracking/mail/:id", require("./middleware/active"), async(req, res, next)=>{
    try{
        const comLogUpdate = await communication.findByIdAndUpdate(req.params.id, {opened:true});
        return res.send({success:true})
    }catch(e){
        return res.send({success:false});
    }
});

router.get("/session/:id", require("./middleware/active"), async(req, res, next)=>{
    try{
        const sessionUni = await session.findById(req.params.id, req.query.param + " -_id");
        return res.send({session:sessionUni[req.query.param]})
    }catch(e){
        return res.send({success:false});
    }
});

router.use("/sa/", require("./middleware/sa"), require("./sa/index"));
router.use("/adm/", require("./middleware/admin"),require("./admin/index"));
router.use("/emp/", require("./middleware/emp"),require("./emp/index"));
router.use("/stu/", require("./middleware/stu"),require("./stu/index"));
router.use("/apli/", require("./middleware/apli"),require("./apli/index"));

router.use("/auth/",require("./auth/index"));
router.use("/crm/",require("./CRM/index"));

module.exports = router;