const mongoose = require("mongoose"), bcrypt = require("bcryptjs");

function validator(options = {}, type = 0, reqMsg = "") {
  const types = [String, Number, Date];
  var validation = { type: types[type] };
  for (var key in options) {validation[key] = options[key];}
  
  return validation;
}

function onlyValidation(msg = "", type = 0){ return validator({}, type, msg) }
function selector(max){ return validator({min:1,max}, 1) }

const parent_name= validator({ maxlength: 20 }),
parent_qualification= validator({ maxlength: 10 }),
parent_occupation= onlyValidation("Name"),
parent_income= validator({}, 1),
mobile = validator({length:10}, 1),
name = onlyValidation("Name"),
pfp = String,
email =  validator({unique: true}, 0, "Email"),
password = onlyValidation("Password"),
resetPassword = {
  resetPwd: String,
  resetTime: Date
},
dob = onlyValidation("", 0),
bloodGroup = selector(8),
placeOfBirth = validator(),
marital = selector(3),
gender = selector(2),
religion = selector(7),
caste = selector(19),
nationality =  validator({maxlength:10}),
category = selector(9),
motherTongue = selector(17),
medHis = validator({maxlength:40}),
address = validator({maxlength:70}, 0, ""),
pin = validator({length: 6}, 1, ""),
aadhar = onlyValidation("", 1),
contact = validator({maxlength:20}),
nominee = validator({max:10}),
contactRel = validator({maxlength:10}),
family_relation = validator({maxlength:20}),
createdBy = {type:mongoose.Schema.Types.ObjectId, ref: "Session", required:true},
institute = {type:mongoose.Schema.Types.ObjectId, ref: "Institute", required:true},
batch = {type:mongoose.Schema.Types.ObjectId, ref: "Batch"},
division = {type:mongoose.Schema.Types.ObjectId, ref: "Division"},
disabled = {type:Boolean},
validated = {type:Boolean},
department = {type:mongoose.Schema.Types.ObjectId, ref: "Department"},
post = {type:mongoose.Schema.Types.ObjectId, ref: "Post"};

const studentSchema = new mongoose.Schema({
  name, email, password, ...resetPassword, stu:Boolean,
  house: onlyValidation("House", 1),institute,batch,division,disabled,validated,pfp,motherPfp:pfp, fatherPfp:pfp,

  dob, gender, bloodGroup, placeOfBirth, religion, caste, nationality, category, motherTongue, aadhar, address, pin, mobile,

  m_name: parent_name,
  m_qual: parent_qualification,
  m_occ: parent_occupation,
  m_income: parent_income,
  m_mobile: mobile,
  
  f_name: parent_name,
  f_qual: parent_qualification,
  f_occ: parent_occupation,
  f_income: parent_income,
  f_mobile: mobile,
  
  sib_name: parent_name,
  sib_qual: parent_qualification,
  sib_gr: Number,

  emer_contact:contact, emer_mobile:mobile, emer_contactRel:contactRel, medHis
}, {timestamps:true});

const employeeSchema = new mongoose.Schema({
  name, email, mobile, password, ...resetPassword, post,createdBy,institute, disabled,validated,pfp, emp:Boolean,
  department, department2:department, subject:onlyValidation(), teacher:{type:Number, enum:[0,1,2,3,4]}, designation:onlyValidation(),
  dob, gender, bloodGroup, marital, religion, caste, nationality, category, motherTongue, medHis,
  address, pin,
  aadhar, pan: onlyValidation(),
    ifsc: onlyValidation(), pf: onlyValidation(),
    uan: onlyValidation(),
    doj: Date,
  fn1:family_relation,
  fr1:family_relation,
  fno1:nominee,
  fn2:family_relation,
  fr2:family_relation,
  fno2:nominee,
  fn3:family_relation,
  fr3:family_relation,
  fno3:nominee,

  eName:contact,
  eRel:contactRel,
  eNo:mobile
}, {timestamps:true});

async function savePwd(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(5));
  next();
}

async function matchPwd(pwd) {
  return await bcrypt.compare(pwd, this.password);
}

studentSchema.pre("save", savePwd);
studentSchema.methods.matchPwd = matchPwd;

employeeSchema.pre("save", savePwd);
employeeSchema.methods.matchPwd = matchPwd;

const Student = mongoose.model("User", studentSchema, "User");
const Employee = mongoose.model("Usesr", employeeSchema, "User");

module.exports = {Student, Employee};