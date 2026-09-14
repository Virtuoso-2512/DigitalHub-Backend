const mongoose = require("mongoose"), bcrypt = require("bcryptjs");

const instituteModel = mongoose.Schema({
    trust: String,
    main: String,
    disable: Boolean,
    
    name: {type:String, required:true, unique:true},
    email: {type:String, required:true},
    password: {type:String},

    licenses:{
        student:{type:Number,
            validate: {
              validator: function(value) {
                return value >= -1;
              },
              message: 'Field value must be greater than or equal to -1.' // Change the error message if needed
            }},
        employee:{type:Number,
            validate: {
              validator: function(value) {
                return value >= -1;
              },
              message: 'Field value must be greater than or equal to -1.' // Change the error message if needed
            }}
    },

    tagline: {type:String},
    bottomLine: {type:String},
    accepting: {type:Boolean, default:true},
    
    icon: {type:mongoose.Schema.Types.ObjectId, ref: "File"},
    background: {type:mongoose.Schema.Types.ObjectId, ref: "File"},

    resetPwd:String,
    resetTime:Date
}, { timestamps: true });


async function savePwd(next) {
    if (!this.isModified("password")) next();
  
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(7));
    next();
}
  
async function matchPwd(pwd) {
    return await bcrypt.compare(pwd, this.password);
}
  
async function resetPwd() {
    /*const resetToken = crypto.randomBytes(25).toString("hex");
  
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
    
    return true;*/
}
  
instituteModel.pre("save", savePwd);
instituteModel.methods.matchPwd = matchPwd;
instituteModel.methods.reseterPassword = resetPwd;

module.exports = mongoose.model("Institute", instituteModel)