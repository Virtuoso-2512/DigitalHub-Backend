const session = require("../models/session");

module.exports = async (req, res, next) => {
  const token = req.headers["authorisation"], err = () => res.status(400).send();
  if (!token) return err();

  try {
    const admin = await session.findById(token, "active lead institute user");
    req.session = admin;
    req.token = token;

    if(admin.active) return next();

    return err();
  } catch (er) {
    return err();
  }
};