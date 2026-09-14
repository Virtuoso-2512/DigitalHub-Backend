const express = require("express"), lead = require("../models/lead"), course = require("../models/course"), institute = require("../models/institute");
const campaign = require("../models/campaign");
const tryCatch = require("../utils/tryCatch"), mail = require("../utils/mail"), router = express.Router(), generatePassword = require("../utils/generator"), {WaClient} = require("../sa/WhatsApp");

tryCatch(router, "campaign/:id", 0, async(req, res) => {
    if(req.params.id.length !== 24) return;
    const campaignFInd = await campaign.findById(req.params.id); 
    res.send({active: !campaignFInd.disable});
})

tryCatch(router, "coursesof/:id", 0, async(req, res) => {
    if(req.params.id.length !== 24) return;
    const courses = await course.find({institute:req.params.id,disabled:{$ne:true}}, "name"); 
    res.send({courses})
})

tryCatch(router, "institutes", 0, async(req, res) => {
    const institutes = await institute.find({ main: {$ne: "(default)"}}, "name");
    res.send({institutes})
})

const states = ['Andaman & Nicobar (UT)\r', 'Andhra Pradesh\r', 'Arunachal Pradesh\r', 'Assam\r', 'Bihar\r', 'Chandigarh (UT)\r', 'Chhattisgarh\r', 'Dadra & Nagar Haveli and Daman & Diu (UT)\r', 'Delhi\r', 'Goa (UT)\r', 'Gujarat\r', 'Haryana\r', 'Himachal Pradesh\r', 'Jammu (UT)\r', 'Jharkhand\r', 'Karnataka\r', 'Kerala\r', 'Lakshadweep (UT)\r', 'Leh (UT)\r', 'Maharashtra\r', 'Madhya Pradesh\r', 'Manipur\r', 'Meghalaya\r', 'Mizoram\r', 'Nagaland\r', 'Odisha\r', 'Puducherry (UT)\r', 'Punjab\r', 'Rajasthan\r', 'Sikkim\r', 'Tamil Nadu\r', 'Tripura\r', 'Telangana\r', 'Uttar Pradesh\r', 'Uttarakhand\r', 'West Bengal\r', "Others"];

tryCatch(router, "states_institutes", 0, async(req, res) => {
    var institutes = [], courses = [];
    
    if(req.query.institute && req.query.institute !== "undefined"){ 
        
        const instiName = await institute.findById(req.query.institute, "name");
        if(!instiName) {
            institutes = await institute.find({ main: {$ne: "(default)"}, accepting:true}, "name");
            return;
        }

        institutes = instiName.name;

        if(req.query.course && req.query.course?.length === 24){
            
            const courseName = await course.findById(req.query.course, "name");
            courses = courseName.name
        }else courses = await course.find({institute:req.query.institute,disabled:{$ne:true}}, "name");

    } else institutes = await institute.find({ main: {$ne: "(default)"}, accepting:true}, "name");
    
    res.send({states, institutes, courses, accept:true})
})

tryCatch(router, "states_courses/:id", 0, async(req, res) => {
    const courses = await course.find({institute:req.params.id,disabled:{$ne:true}}, "name");
      
    res.send({states, courses, accept:true})
})

tryCatch(router, "submit", 1, async(req, res) => {

    const find = await lead.countDocuments({email:req.body.email});
    if(find !== 0) return res.send({err:"Email Address Already Exists !"});

    const fin2 = await lead.countDocuments({phone:req.body.phone});
    if(fin2 !== 0) return res.send({err:"Phone No Already Exists !"});

    const password = await generatePassword(10);
    const newLead = await lead.create({password, ...req.body});
    const findLead = await lead.findById(newLead._id, "institute").populate("institute", "name");
    const instiName = findLead.institute.name || "";
    const LINK = `http://localhost:3000/login?username=Applicant_`+newLead.email+"&password="+password;

    await mail(
        `Thanks for showing your interest, ${newLead.name} !`, 
        newLead.email, 
        `Thanks for showing your interest, ${newLead.name} !`,
        `Please Login at <a href="${LINK}">${LINK}</a> \n\n After Login, You can Verify and Start Application to fast track your admission on <b>${instiName}</b>`,
        {name:"Login",link:LINK}, "", "https://res.cloudinary.com/demo/image/upload/v1679673598/docs_uploading_example/Email-Gif_qil1np.gif", `You are receiving this email because someone registered an Application Admission form in <b>${instiName} CRM</b>  !`
    )
    
    if(newLead.WAAsk){
        const msg = `*Thanks for showing your interest, ${newLead.name} !* \n\n Please Login at `+LINK+"\n\n After Login, You can Verify and Start Application to fast track your admission on *"+instiName+"*";
        await WaClient(newLead.phone, msg);
    }

    res.send({success:true})
})

module.exports = router;