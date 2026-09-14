const express = require("express");
const mongoose = require("mongoose");
const lead = require("../models/lead");
const tryCatch = require("../utils/tryCatch");
const XLSX = require('xlsx');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { Employee } = require("../models/stu_emp");
const router = express.Router();
const options = require("../staticOptions");
const leadLogs = require("../models/leadLogs");
const session = require("../models/session");
const communication = require("../models/communication");
const campaign = require("../models/campaign");

const states = ['Andaman & Nicobar (UT)\r', 'Andhra Pradesh\r', 'Arunachal Pradesh\r', 'Assam\r', 'Bihar\r', 'Chandigarh (UT)\r', 'Chhattisgarh\r', 'Dadra & Nagar Haveli and Daman & Diu (UT)\r', 'Delhi\r', 'Goa (UT)\r', 'Gujarat\r', 'Haryana\r', 'Himachal Pradesh\r', 'Jammu (UT)\r', 'Jharkhand\r', 'Karnataka\r', 'Kerala\r', 'Lakshadweep (UT)\r', 'Leh (UT)\r', 'Maharashtra\r', 'Madhya Pradesh\r', 'Manipur\r', 'Meghalaya\r', 'Mizoram\r', 'Nagaland\r', 'Odisha\r', 'Puducherry (UT)\r', 'Punjab\r', 'Rajasthan\r', 'Sikkim\r', 'Tamil Nadu\r', 'Tripura\r', 'Telangana\r', 'Uttar Pradesh\r', 'Uttarakhand\r', 'West Bengal\r', "Others"];

tryCatch(router, "logs/:id", 0, async(req, res) => {
    const logs = await leadLogs.find({lead:req.params.id}, "type description createdAt").sort({"createdAt":"desc"});
    res.send({logs})
})

tryCatch(router, "logs-communication/:id", 0, async(req, res) => {
    const leadInfo = await lead.findById(req.params.id, "email phone");

    const phone = (leadInfo.phone.toString().length === 10 ? "91"+leadInfo.phone : leadInfo.phone)+"@c.us";

    const WaLogs = await communication.find({phone}, "content created").sort({"created":"desc"});
    const MailLogs = await communication.find({mail:leadInfo.email}, "content created").sort({"created":"desc"});

    res.send({WaLogs, MailLogs})
})

tryCatch(router, "campaigns", 0, async(req, res) => {
    const {page}=req.query, perPage = 10;
    const campaigns = await campaign.find({}, "name").skip((page - 1) * perPage).limit(perPage).sort({createdAt:"desc"}), total = await campaign.countDocuments({}); 
    res.send({campaigns, total})
})

tryCatch(router, "leads", 0, async(req, res) => {
    const page = req.query.page, perPage = 10, props = ["name", "email", "createdAt", "type", "score"], {prop, value} = req.query;

    var query = {};

    if(prop === "0" || prop === "1" || prop === "3") query = {[props[prop]]: {$regex:value, $options:'i'}};

    if(prop === "2"){
        const dates = value.split("/slash/");
        query = {"createdAt": {$gte:new Date(dates[0]), $lt:new Date(dates[1])}};
    }

    if(prop === "4"){
        const values = value.split(" to ");
        query = {[props[prop]]: {$gte:parseInt(values[0]), $lt:parseInt(values[1])}};
    }

    if(req.session.access === 1){
        const posttt = await Employee.findById(req.session.user, "post").populate("post", "permissions");
        
        if(posttt.post.permissions.crm.view) query = query;
        else query = {...query, relationshipManager:req.session.user}
    }

    console.log(query);

    const leads = await lead.find(query, "name email utm.source createdAt score status").skip((page - 1) * perPage).limit(perPage).sort({createdAt:"desc"}), total = await lead.countDocuments(query); 
    return res.send({ leads, total });
})

tryCatch(router, "lead/status", 0, async(req, res) => {
    const newLog = await leadLogs.create({lead:req.query.id, type:4, description:"Change in lead Type to : " + options["lead-status"][parseInt(req.query.status || 0)]});

    const leadFind = await lead.findByIdAndUpdate(req.query.id, {status:parseInt(req.query.status || 0)}); 
    return res.send({ success: true });
})

tryCatch(router, "lead/rm", 0, async(req, res) => {
    const Rm = await Employee.findById(req.query.rm, "name"); 
    const newLog = await leadLogs.create({lead:leadFind._id, type:5, description:"Lead's Relationship Manager is Changed to : " + Rm.name});

    const leadFind = await lead.findByIdAndUpdate(req.query.id, {relationshipManager:req.query.rm || ""}); 
    return res.send({ success: true });
})

tryCatch(router, "lead/:id", 0, async(req, res) => {
    const leadFind = await lead.findById(req.params.id, "verified state status stage relationshipManager phone createdAt name institute BROWSER DEVICE WAAsk city course email").populate("institute", "name").populate("course", "name"); 
    const sessionFind = await session.find({lead:req.params.id}, 'updatedAt').sort({updatedAt:"desc"}).limit(1); 

    return res.send({ lead:{...leadFind._doc, state:states[leadFind.state]}, lastSession:sessionFind[0].updatedAt });
})

tryCatch(router, "rm", 0, async(req, res) => {
    Employee.find({}, "name post").populate('post', "permissions.crm.relManager").exec(function(err, emps) {
        if (err) return res.send({err});

        var rms = [];
        emps.map(emp => {
            if(emp?.post?.permissions?.crm?.relManager === true)return rms.push({name:emp.name, _id:emp._id});
            return;
        });
        return res.send({rms})
    });
})

tryCatch(router, "download", 0, async(req, res) => {
    const leadsId = req.query.leads.split(",");
    var mongooseStyleIds = [];

    await leadsId.map(item => mongooseStyleIds.push(mongoose.Types.ObjectId(item)));

    const leads = await lead.find({_id: {$in: mongooseStyleIds}}).populate("institute", "name").populate("course", "name"), workbook = XLSX.utils.book_new(); // Create a new workbook

    var dataList = [];
    await leads.map((lead,idx) => dataList.push({"Sr. No.":idx+1,Name:lead.name, Email:lead.email, Phone:lead.phone,"Registered on":lead.createdAt, WhatsApp:lead.WAAsk ? "Yes" : "No", Institute: lead.institute.name, Course: lead.course.name, State:states[lead.state], City:lead.city}))

    // Add a new sheet to the workbook
    const sheet = XLSX.utils.json_to_sheet(dataList);
    XLSX.utils.book_append_sheet(workbook, sheet, "Leads");

    const id = uuidv4(); // Get UUID
    
    const directoryPath = path.join(__dirname, "../public/temp/"+id); // Create a new directory for the output file

    if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath);

    const outputFilePath = path.join(directoryPath, 'leads.xlsx'); // Specify the output file path

    XLSX.writeFile(workbook, outputFilePath, { bookType: 'xlsx' }); // Write the workbook to the output file

    return res.send({ id });
})

module.exports = router;