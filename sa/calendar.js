const express = require("express");
const router = express.Router();
const event = require("../models/event");
const tryCatch = require("../utils/tryCatch");

tryCatch(router, "delete-event/:id", 0, async(req, res) => {
    const content = await event.findOne({index:req.query.type}, "name icon");
    console.log(content);
    //return res.send(content?.name ? content : {})
});

tryCatch(router, "new-event", 1, async(req, res) => {
    console.log(req.session);
    const content = await event.create({...req.body, createdBy: req.session.userId});
    return res.send({success:content._id ? true : false});
});

module.exports = router;