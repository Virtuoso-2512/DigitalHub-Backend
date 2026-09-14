const express = require("express");
const router = express.Router();
const post = require("../models/post");
const {Employee} = require("../models/stu_emp");
const tryCatch = require("../utils/tryCatch");
//C:\Program Files\WindowsApps\SpotifyAB.SpotifyMusic_1.210.760.0_x86__zpdnekdrzrea0\Apps
tryCatch(router, "create", 1, async(req, res) => {
    const newPost = await post.create(req.body);
    if(newPost._id) return res.send({success:true});
});

tryCatch(router, "", 0, async(req, res) => {
    const posts = await post.find({}, "name updatedAt"+(req.query.noType ? "" : " type"));
    return res.send({posts})
});

tryCatch(router, "count", 0, async(req, res) => {
    const count = await Employee.countDocuments({post:req.query.id}); 
    return res.send({count});
})

tryCatch(router, ":id", 0, async(req, res) => {
    const postFind = await post.findById(req.params.id); 
    const count = await Employee.countDocuments({post:req.params.id}); 
    return res.send({ post:postFind._doc, count});
})

tryCatch(router, "save", 1, async(req, res) => {
    const postFind = await post.findByIdAndUpdate(req.query.id, req.body); 
    return res.send({ success: true });
})

module.exports = router;