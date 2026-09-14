const express = require("express");
const lead = require("../models/lead");
const { Employee } = require("../models/stu_emp");
const Post = require("../models/post");
const tryCatch = require("../utils/tryCatch");
const router = express.Router(), {WaGet, WaClient} = require("../sa/WhatsApp"), mail = require("../utils/mail");

tryCatch(router, "explore", 0, async(req, res) => {
    return res.send({options:[
        {icon:"pager", title:"Application Process", link:"/applicationProcess"},
        {icon:"wallet", title:"Fees", link:"/fees"},
        {icon:"file-pen", title:"Forms", text:"An efficient way to collect data in a consolidated and detailed manner", btnText:"Access Forms", link:"/forms"}
    ]})
})

function generateOTP() {   
    var digits = '0123456789';
    var digits2 = '123456789';
    let OTP = '';

    for (let i = 0; i <= 5; i++ ) {
        if(i === 0) OTP += digits2[Math.floor(Math.random() * 10)];
        else OTP += digits[Math.floor(Math.random() * 10)];
    }

    return parseInt(OTP);
}

tryCatch(router, "stage", 0, async(req, res) => {
    const leadFind = await lead.findById(req.session.user, "stage");
    return res.send({stage:leadFind.stage});
})

tryCatch(router, "home/prerify", 0, async(req, res) => {
    const type = req.query.type === "1" || req.query.type === "true" ? true : false;
    const leadFind = await lead.findById(req.session.user, type ? "email" : "phone");

    var send = {};
    if(type) send = {value:leadFind.email};
    else send = {value:leadFind.phone, wa: WaGet()};

    return res.send(send);
});

tryCatch(router, "home/send", 0, async(req, res) => {
    const type = req.query.type === "1" || req.query.type === "true" ? true : false;
    const leadFind = await lead.findById(req.session.user, type ? "name email" : "name phone");
    var OTP = await generateOTP();

    if(isNaN(OTP) || OTP.toString().length !==6) OTP = OTP = await generateOTP();

    if(type){ //Send Email
        await mail(
            `OTP for {{Product_Name}} Verification [${OTP}]`, 
            leadFind.email, 
            `OTP : ${OTP}`,
            `OTP for {{Product_Name}} Verification ! \n Use OTP - ${OTP}`,
            "", "", "", `You are receiving this email because <b> You</b> requested for an OTP for activating Your account. If you didn't request an OTP, you can safely ignore this mail.`
        )
    }else{ //Send Phone No.
        await WaClient(leadFind.phone, `*OTP for {{Product_Name}} Verification !* \n\n Please use *${OTP}* OTP to Activate Your Account, and Move to Next Stage of Your Application ! \n\n If you didn't request an OTP, you can safely ignore this message.`);
    }

    const addOTP = await lead.findByIdAndUpdate(req.session.user, {otp:OTP});
    return res.send({success:true});
});

async function getAvailableRelationshipManagers() {
    const relationshipManagerPosts = await Post.find({"permissions.crm.relManager":true}, "_id"), availableManagers = [];
  
    for (const post of relationshipManagerPosts) {
      const usersWithPost = await Employee.find({ post: post._id }, "_id createdAt").sort({createdAt:1});
  
      for (const user of usersWithPost) {
        availableManagers.push(user._id.toString());
      }
    }
  
    return availableManagers;
}

tryCatch(router, "home/verify", 0, async(req, res) => {
    const leadFind = await lead.findById(req.session.user, "otp phone email name");

    if(leadFind.otp === parseInt(req.query.otp)){ 
        /*Allocate Relationship Manager */
        //Step 1 - Get all Current RMs from Query
        const allRms = await getAvailableRelationshipManagers();
        if(!allRms.length) return res.send({success:false});

        //Step 2 - Get Lead to which last RM was allocated
        const lastLead = await lead.find({relationshipManager:{$exists:true}}, "relationshipManager -_id createdAt").sort({ createdAt: -1 }).limit(1);

        const lastRm = lastLead?.[0]?.["relationshipManager"] || "";

        //Step 3 - If lastRm is there search in allRms and return index else allocate to first RM in allRms
        var currRM = "";
        const idx = allRms.indexOf(lastRm.toString());

        if(lastRm && idx !== -1 && idx !== allRms.length) currRM = allRms[idx+1];
        else currRM = allRms[0];

        if(!currRM) return res.send({success:false});

        //Step 4 - Allocate and send a email/wa msg 
        const rmGet = await Employee.findById(currRM, "name email phone");

        await WaClient(leadFind.phone, `Hey *${leadFind.name}*, \n\n We have Allocated a Dedicated Relationship Manager for You. Thier Details are:-\n Name: *${rmGet?.name}* \n Phone: *${rmGet?.phone}* \n Email : *${rmGet?.email}* \n\n Thanks for Your Continued Interest and We Look forward to connect with You !`)     
        
        const updateLead = await lead.findByIdAndUpdate(req.session.user, {verified:req.query.type, status:1, relationshipManager:currRM});
        
        return res.send({success:true});
    }

    return res.send({success:false});
});

tryCatch(router, "explore", 0, async(req, res) => {
    return res.send({options:[
        {icon:"key", title:"Verify",link:"/verify"},
        {icon:"file-invoice", title:"Application Status",link:"/application"},
        {icon:"user-plus", title:"Relationship Manager",link:"/rm"},
        {icon:"wallet", title:"Payment",link:"/payment"},
        {icon:"circle-question", title:"Help",link:"/help"},
    ]})
})

router.use("/auth/", require("../auth/index"));
router.use("/static/", require("../static"));

module.exports = router;