const express = require("express");
const emailWala  = require('deep-email-validator');
const Institute = require("../models/institute");
const Post = require("../models/post");
const router = express.Router();
const {Employee} = require("../models/stu_emp");
const tryCatch = require("../utils/tryCatch");
const mail = require("../utils/mail");
const generatePassword = require("../utils/generator");

tryCatch(router, "count", 0, async(req, res) => {
    const count = await Employee.countDocuments({institute:req.query.institute});
    return res.send({count})
});

tryCatch(router, "", 0, async(req, res) => {
    const page = req.query.page, perPage = 10, props = ["name", "email", "role"], {prop, value} = req.query;

    var query = {};

    if(prop === "0" || prop === "1") query = {[props[prop]]: {$regex:value, $options:'i'}};

    if(prop === "2") query = {"post": value};

    const users = await Employee.find(query, "name email post").populate("post", "name").skip((page - 1) * perPage).limit(perPage).sort({name:"asc"}), total = await Employee.countDocuments(query), roles = await Post.find({}, "name"); 
    return res.send({ users, total, roles });
})

tryCatch(router, "create", 1, async(req, res) => {
    const {email} = req.body;
    if(!email) return;
    const rewws = await emailWala.validate(email);
    
    if (!(rewws.validators.regex && rewws.validators.mx)) return res.send({error:"This Email Address does not Exist !"});

    const count = await Employee.countDocuments({email});
    if (count) return res.send({error:"An Existing Account is Associated with this Email Address !"});

    const mainInsti = await Institute.findOne({main:"(default)"}), password = await generatePassword(10);
    const emp = await Employee.create({institute:mainInsti._id, password, createdBy:req.session._id,...req.body});

    const loginLink = "http://localhost:3000/login?username="+email+"&password="+password;

    await mail(
        `Welcome ${emp.name} on {{Product_Name}} !`, 
        email, 
        "Let's get started, "+emp.name+" !",
        "Welcome to {{Product_name}} !! Your Institute is now using {{Product_Name}}. Please Login to Activate your account and start using {{Product_Name}}",
        {name:"Login", link:loginLink}, "", 
        "", `This Email is assigned by Your Institute Admin for {{Product_Name}} access and is unchangeable !`
    );

    return res.send({success:true});
});

tryCatch(router, ":id", 0, async(req, res) => {
    if(!req.params.id) return res.send({success:false});

    const users = await Employee.findById(req.params.id, req.query.query + " -password -__v -_id ").populate("post", "name").populate("institute", "name");
    return res.send(users)
});

module.exports = router;