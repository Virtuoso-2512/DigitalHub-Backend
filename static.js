const express = require("express");
const router = express.Router();
const tryCatch = require("./utils/tryCatch");
const options = require("./staticOptions");

const optionSender = link => tryCatch(router, link, 0, async(req, res) => res.send({options:options[link]}))

optionSender("lead-stages");
optionSender("lead-status");
optionSender("post-types-t");
optionSender("post-types-nt");
optionSender("os-names");
optionSender("bldGrp");
optionSender("caste");
optionSender("category");
optionSender("gender");
optionSender("marital");
optionSender("mother-tongues");
optionSender("occupation");
optionSender("religion");
optionSender("non-teaching-posts");
optionSender("teaching-posts");

module.exports = router;