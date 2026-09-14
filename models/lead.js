const mongoose = require("mongoose"), bcrypt = require("bcryptjs");

const leadModel = mongoose.Schema({
    institute: {type:mongoose.Schema.Types.ObjectId, ref: "Institute", required:true},
    campaign: {type:mongoose.Schema.Types.ObjectId, ref: "Campaign", required:true},
    course: {type:mongoose.Schema.Types.ObjectId, ref: "Course", required:true},
    name: {type:String,required:true},
    state: {type:Number,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    phone: {type:Number,required:true},
    otp: {type:Number,length:6},
    city: String,

    BROWSER: String,
    DEVICE: String,
    referrer: String,
    utm: Object,

    WAAsk: Boolean,
    verified: Number, //if Wa = 1, Email = 2
    
    resetPwd:String,
    resetTime:Date,

    status: Number,
    stage: Number,
    score: Number,
    relationshipManager:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps:true});

async function savePwd(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(5));
  next();
}

async function matchPwd(pwd) {
  return await bcrypt.compare(pwd, this.password);
}

async function resetPwd() {
  const resetToken = crypto.randomBytes(25).toString("hex");

  this.resetPwd = resetToken;
  this.resetTime = Date.now() + (10 * 60000) // 10 Minutes;
  this.save();

  await sendEmail(
    `Password Reset for ${this.name} `, 
    this.email, 
    `Password Reset for ${this.name} - Student \n>Password Reset At : ${CLIENT_SITE + "/reset/"+resetToken}`, 
    reqPwd(this.username, resetToken), 
    `You are receiving this email because you requested a password reset. If you didn't request, you can safely ignore this email. PLEASE DO NOT SHARE THIS EMAIL/LINK WITH ANYONE. it is valid for 10 mins.`
  );
  
  return true;
}

async function session(ip, loc, userId, os, employee) {
  const info = await Sessions.create({ip, loc, userId, os, employee});
  return info._id.toString();
};

leadModel.pre("save", savePwd);
leadModel.methods.matchPwd = matchPwd;
leadModel.methods.reseterPassword = resetPwd;
leadModel.methods.getToken = session;

module.exports = mongoose.model("Lead", leadModel)