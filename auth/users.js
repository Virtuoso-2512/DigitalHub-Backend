const {Student} = require("../models/stu_emp");
const {ObjectId} = require("mongodb");

const users = async (req, res) => {
    try {
      const data = await Student.find({name:{$regex:`^${req.params.name}*`}, _id: {$ne:ObjectId(req.session.user)}}, "name photo").limit(15);
      res.send({data})
    }catch(err){
      res.send({success:false})
      console.log(err)
    }
}

module.exports = users