const express = require("express");
const tryCatch = require("../utils/tryCatch");
const {Employee, Student} = require("../models/stu_emp");
const session = require("../models/session");
const lead = require("../models/lead");
const options = require("../staticOptions");
const Institute = require("../models/institute");
const mail = require("../utils/mail");
const router = express.Router();
const generatePassword = require("../utils/generator")
const osNames = options["os-names"];

tryCatch(router, "users/:name", 0, require("./users"));

tryCatch(router, "token", 0, async(req, res) => {
    if(req.query.type === "1"){
        const sessionFind = await session.findById(req.headers.authorisation).populate("institute", "name").populate("user", "name _id").populate("lead", "name");

        if((new Date(sessionFind.LoggedInAt).getTime() + 2419200000 /*Add 28 days*/) <= new Date().getTime()){
            sessionFind.active = false;
            sessionFind.save();

            return res.send({success:false})
        }

        return res.send({userLevel:sessionFind.access,active:sessionFind.active, userId: sessionFind?.user?._id.toString() || "", name:sessionFind?.user?.name || sessionFind?.lead?.name || sessionFind?.institute?.name || ""}); 
    }
    const sessionFind = await session.findById(req.headers.authorisation);
    return res.send({userLevel:sessionFind.access,active:sessionFind.active});  
});

tryCatch(router, "login", 1, async(req, res) => {
    const {ip, loc, os, systemName} = req.body, emp = await Employee.findOne({email:req.body.username});

    if(!emp.password) return res.send({})

    if(await emp.matchPwd(req.body.password)){
        const newSession = await session.create({
            ip,
            loc,
            user:emp._id, 
            LoggedInAt:new Date(),
            active:true,
            access:emp.emp || emp.post ? 1 : 2,
            os: osNames.indexOf(os),
            systemName
        });

        return res.send({token:newSession._id});
    }
    
    return res.send({})
});

tryCatch(router, "login_admin", 1, async(req, res) => {
    const {ip,username,loc, os, systemName} = req.body;

    const instituteTrial = await Institute.findOne({name:username});

    if(await instituteTrial.matchPwd(req.body.password)){
        const disablePreviousSession = await session.updateMany({institute:instituteTrial._id, ip, active:true}, {active:false});

        const newSession = await session.create({
            ip,
            loc,
            institute:instituteTrial._id, 
            LoggedInAt:new Date(),
            active:true,
            access:instituteTrial.main ? -1 : 0,
            os: osNames.indexOf(os),
            systemName
        });

        return res.send({token:newSession._id});
    };

    return res.send({token:""});    
});

tryCatch(router, "login_applicant", 1, async(req, res) => {
    const {ip,username,loc, os, systemName} = req.body;

    const leadTrial = await lead.findOne({email:username});

    if(await leadTrial.matchPwd(req.body.password)){
        const newSession = await session.create({
            ip,
            loc,
            lead:leadTrial._id, 
            LoggedInAt:new Date(),
            active:true,
            access:3,
            os: osNames.indexOf(os),
            systemName
        });

        return res.send({token:newSession._id});
    };

    return res.send({token:""});    
});

const resetMail = async(name, email) => {
    await mail(
        `${name}, Your Password has been changed on {{Product_Name}}`, 
        email, 
        `${name}, Your Password has been changed !`,
        `This is a confirmation that the password for your {{Product_Name}} account has just been changed. If you didn't change your password, Please reset your password as soon as possible and write a mail to your admin.`, 
        "", "", "", `You are receiving this email because <b>this Email Address</b> is associated with {{Product_name}} for <b> ${name}</b> Account.`
    );
}

tryCatch(router, "reset_password", 1, async (req, res) => {
    try {
        const {new1, token} = req.body;
        const query = {resetPwd:token}, filter = "name email resetPwd resetTime password";

        //First Check if User(Employee, Student)
        const user = await Employee.findOne(query, filter)

        if(user?._id && new Date(user?.resetTime).getTime() >= new Date().getTime()){
            user.password = new1;
            user.resetPwd = null;
            user.resetTime = null;
            user.save();
            resetMail(user.name, user.email);
            return res.send({success:true});
        }

        //Second Check if Admin
        const instituteT = await Institute.findOne(query, filter);

        if(instituteT?._id && new Date(instituteT?.resetTime).getTime() >= new Date().getTime()){
            instituteT.password = new1;
            instituteT.resetPwd = null;
            instituteT.resetTime = null;
            instituteT.save();
            resetMail(instituteT.name, instituteT.email);
            return res.send({success:true});
        }

        //Last Check if Applicant
        const ApplicantT = await lead.findOne(query, filter);

        if(ApplicantT?._id && new Date(ApplicantT?.resetTime).getTime() >= new Date().getTime()){
            ApplicantT.password = new1;
            ApplicantT.resetPwd = null;
            ApplicantT.resetTime = null;
            ApplicantT.save();
            resetMail(ApplicantT.name, ApplicantT.email);
            return res.send({success:true});
        }

        return res.send({success:false});
    }catch{
        return res.send({success:false})
    }
});

tryCatch(router, "reset", 0, async (req, res) => {
    try {
        const {username} = req.query;

        if(!username) return res.send({success:false});

        var Emp = await Employee.findOne({email:username});

        if(!Emp.emp) Emp = await Student.findOne({email:username});

        if(!Emp._id) return res.send({success:false});

        const token = generatePassword(18, true);

        Emp.resetPwd = token;
        Emp.resetTime = Date.now() + (10 * 60000) // 10 Minutes;
        Emp.save();

        const resetLink = "http://localhost:3000/reset/"+token;

        await mail(
            `Password Reset Link for ${Emp.name} `, 
            Emp.email, 
            `${Emp.name}, Password Reset Link !`,
            `We heard You have a Problem logging in to your {{Product_Name}} account. Please Click on the Button below or use the link to reset your password : <a href="${resetLink}">${resetLink}</a>`, 
            {name:"Reset Password", link:resetLink}, "", "", `You are receiving this email because you requested a password reset. If you didn't request, you can safely ignore this email. PLEASE DO NOT SHARE THIS EMAIL/LINK WITH ANYONE. it is valid for 10 mins.`
        );

        return res.send({success:true})
    }catch{
        return res.send({success:false})
    }
});

tryCatch(router, "reset_admin", 0, async (req, res) => {
    try {
        const {username} = req.query;

        if(!username) return res.send({success:false});

        const instituteTrial = await Institute.findOne({name:username});

        if(!instituteTrial._id) return res.send({success:false});

        const token = generatePassword(18, true);

        instituteTrial.resetPwd = token;
        instituteTrial.resetTime = Date.now() + (10 * 60000) // 10 Minutes;
        instituteTrial.save();

        const resetLink = "http://localhost:3000/reset/"+token;

        await mail(
            `Password Reset Link for ${instituteTrial.name} `, 
            instituteTrial.email, 
            `${instituteTrial.name} Admin, Password Reset Link !`,
            `We heard You have a Problem logging in to your {{Product_Name}} Admin account. Please Click on the Button below or use the link to reset your password : <a href="${resetLink}">${resetLink}</a>`, 
            {name:"Reset Password", link:resetLink}, "", "", `You are receiving this email because you requested a password reset. If you didn't request, you can safely ignore this email. PLEASE DO NOT SHARE THIS EMAIL/LINK WITH ANYONE. it is valid for 10 mins.`
        );

        return res.send({success:true})
    }catch{
        return res.send({success:false})
    }
});

tryCatch(router, "reset_applicant", 0, async (req, res) => {
    try {
        const {username} = req.query;

        if(!username) return res.send({success:false});

        const leadTrial = await lead.findOne({email:username});

        if(!leadTrial._id) return res.send({success:false});

        const token = generatePassword(18, true);

        leadTrial.resetPwd = token;
        leadTrial.resetTime = Date.now() + (10 * 60000) // 10 Minutes;
        leadTrial.save();

        const resetLink = "http://localhost:3000/reset/"+token;

        await mail(
            `Password Reset Link for ${leadTrial.name} `, 
            leadTrial.email, 
            `${leadTrial.name} Applicant, Password Reset Link !`,
            `We heard You have a Problem logging in to your {{Product_Name}} Applicant account. Please Click on the Button below or use the link to reset your password : <a href="${resetLink}">${resetLink}</a>`, 
            {name:"Reset Password", link:resetLink}, "", "", `You are receiving this email because you requested a password reset. If you didn't request, you can safely ignore this email. PLEASE DO NOT SHARE THIS EMAIL/LINK WITH ANYONE. it is valid for 10 mins.`
        );

        return res.send({success:true})
    }catch{
        return res.send({success:false})
    }
});

tryCatch(router, "change", 1, async (req, res) => {
    try {
      const {old, new1} = req.body;
  
      if (!(old !== new1 && new1.length <= 25 && new1.length >= 8)) return err();

      if(req.body.userLevel === 0 || req.body.userLevel === -1){
        const institute = await Institute.findById(req.session.institute, "password email name");

        if(!institute?._id) return res.send({success:false});

        if(await institute.matchPwd(old)){

            if(parseInt(req.query.logout) == 1){
                const disablePreviousSession = await session.updateMany({institute:institute._id, active:true}, {active:false});
                const enableOneSession = await session.findById(req.session._id, {active:true});
            }

            institute.password = new1;
            await institute.save();

            resetMail(institute.name, institute.email);
    
            return res.send({success:true});
        }
      }
  
      if(req.body.userLevel === 1 || req.body.userLevel === 2){
        const user = await Employee.findById(req.session.user, "password disabled name email username");
    
        if(!user || user.disabled) return res.send({msg:"Your account has been blocked by your Admin !"})
    
        if (await user.matchPwd(old)){
            user.password = new1;
            await user.save();            
            resetMail(user.name, user.email);
            return res.send({success:true});
        }else return res.send({success:false, msg:"Wrong Pwd!"});
        }
  
      return res.send({success:false});
    } catch (er) { console.log(er);return res.status(400).send()}
});

module.exports = router;