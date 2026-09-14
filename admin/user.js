const express = require("express");
const emailWala  = require('deep-email-validator');
const Post = require("../models/post");
const router = express.Router();
const {Employee, Student} = require("../models/stu_emp");
const tryCatch = require("../utils/tryCatch");
const mail = require("../utils/mail");
const generatePassword = require("../utils/generator");

tryCatch(router, "count", 0, async(req, res) => {
    const count = await Employee.countDocuments({institute:req.session.institute});
    return res.send({count})
});

tryCatch(router, "get", 0, async(req, res) => {
    const emps = await Employee.find({institute:req.session.institute, department:req.query.dept, [req.query.f]:req.query.v}, "name "+req.query.query);
    return res.send({emps})
});

tryCatch(router, "get/s", 0, async(req, res) => {
    const emps = await Student.find({institute:req.session.institute, batch:req.query.batch, [req.query.f]:req.query.v}, "name "+req.query.query).populate("division", "name");
    return res.send({emps})
});


tryCatch(router, "", 0, async(req, res) => {
    const page = req.query.page, perPage = 10, props = ["name", "email", "role", "teacher"], {prop, value} = req.query;
    var query = {};

    if(prop === "0" || prop === "1"  ) query = {[props[prop]]: {$regex:value, $options:'i'}};
    if(prop === "2"|| prop === "3") query = {[props[prop]]: value};
    
    if(req.query.dept) query = {...query, department:req.query.dept};

    const users = await Employee.find({...query, institute:req.session.institute}, "name email emp dept").skip((page - 1) * perPage).limit(perPage).sort({name:"asc"}), total = await Employee.countDocuments({...query, institute:req.session.institute}), roles = await Post.find({}, "name"); 
    return res.send({ users, total, roles });
})

tryCatch(router, "create", 1, async(req, res) => {
    const {email, typo} = req.body;
    if(!email) return;
    const rewws = await emailWala.validate(email);
    
    if (!(rewws.validators.regex && rewws.validators.mx)) return res.send({error:"This Email Address does not Exist !"});

    const count = await Employee.countDocuments({email});
    if (count) return res.send({error:"An Existing Account is Associated with this Email Address !"});

    const password = await generatePassword(10);
    var emp;

    if(typo) emp = await Employee.create({emp:true, institute:req.session.institute, password, createdBy:req.session._id,...req.body});
    else emp = await Student.create({stu:true, institute:req.session.institute, password, createdBy:req.session._id,...req.body});

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

    const users = await Employee.findById(req.params.id,"name email department" + req.query.query ).populate("post", "name").populate("institute", "name");
    return res.send(users)
});

tryCatch(router, "stu/:id", 0, async(req, res) => {
    if(!req.params.id) return res.send({success:false});

    const users = await Student.findById(req.params.id, "name email batch" + req.query.query).populate("batch", "name").populate("institute", "name");
    return res.send(users)
});

tryCatch(router, "stu/:id/change", 0, async(req, res) => {
    const abc = await Student.findByIdAndUpdate(req.params.id, { [req.query.f]:req.query.v }); 
    return res.send({success:true});
});

tryCatch(router, ":id/change", 0, async(req, res) => {
    const abc = await Employee.findByIdAndUpdate(req.params.id, { [req.query.f]:req.query.v }); 
    return res.send({success:true});
});

module.exports = router;