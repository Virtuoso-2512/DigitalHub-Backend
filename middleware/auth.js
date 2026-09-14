const session = require("../models/session");

exports.protect = async (req, res, next) => {
  const token = req.headers["authorisation"], err = () => res.status(400).send();
  if (!token) return err();

  try {
    const user = await session.findById(token, "active userId "+req.headers.special);
    req.session = user;
    req.token = token;

    if(user.active) return next();

    return err();
  } catch (er) {
    return err();
  }
};