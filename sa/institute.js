const express = require("express");
const router = express.Router();
const institute = require("../models/institute");
const tryCatch = require("../utils/tryCatch");
const mail = require("../utils/mail");
const session = require("../models/session");
const options = require("../staticOptions");
const generatePassword = require("../utils/generator");
const osNames = options["os-names"];

tryCatch(router, "create", 1, async(req, res) => {
    if(req.session.access !== -1) return res.send({success:false});

    const password = await generatePassword(10);
    const newInsti = await institute.create({password, ...req.body});

    const loginLink = "http://localhost:8001/login?username=Admin_"+newInsti.name+"&password="+password;

    await mail(
        `Welcome ${newInsti.name} on {{Product_Name}} !`, 
        newInsti.email, 
        "Let's get started, "+newInsti.name+" !", 
        "Welcome to {{Product_name}}. Your new account comes with access to {{Product_name}} products and services. We are excited to see what you create with {{Product_Name}}.", 
        {name:"Login", link:loginLink}, "", "",  `This Email is assigned by Your Institute Admin for {{Product_Name}} admin access and is unchangeable !`
    );


    if(newInsti._id) return res.send({success:true})
});

tryCatch(router, "", 0, async(req, res) => {
    const {page} = req.query, perPage = 10;
 
    const institutes = await institute.find({main:{$exists:false}}, "name email").skip((page - 1) * perPage).limit(perPage).sort({name:"asc"}); 

    const total = await institute.countDocuments({});

    return res.send({institutes,total:total-1})
});

tryCatch(router, "login/:id", 1, async(req, res) => {
    if(req.params.id.length !== 24) return res.send({success:false});

    const disableCurrSession = await session.findByIdAndUpdate(req.token, {active:false});

    const {ip, loc, os, systemName} = req.body; 

    const newSession = await session.create({
        ip,
        loc,
        institute:req.params.id, 
        LoggedInAt:new Date(),
        active:true,
        access: 0,
        os: osNames.indexOf(os),
        systemName
    });

    return res.send({token:newSession._id});
});


tryCatch(router, "icon", 0, async(req, res) => {
    const institutes = await institute.findById(req.session.institute, "icon");
    return res.send(institutes);
});


tryCatch(router, ":id", 0, async(req, res) => {
    if(!req.params.id) return res.send({success:false});
    
    const institutes = await institute.findById(req.params.id, req.query.query);
    return res.send(institutes)
});

tryCatch(router, "licenses/:id", 1, async(req, res) => {
    if(!req.params.id) return res.send({success:false});

    const institutes = await institute.findByIdAndUpdate(req.params.id, {licenses:{...req.body}});
    return res.send({success:true})
});

tryCatch(router, "able/:id", 0, async(req, res) => {
    if(!req.params.id) return res.send({success:false});

    const instituteNxt = await institute.findByIdAndUpdate(req.params.id, {disable:req.query.disable?true:false});
    return res.send({success:true});
});

module.exports = router;