const nodemailer = require("nodemailer");
const header = require("./mails/header");
const body = require("./mails/body");
const footer = require("./mails/footer");
const communication = require("../models/communication");

const mail = async(subject, to, headxx, para, btn1, btn2, img, reasonTxt) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "arnav2512thakare@gmail.com",pass: "nnpqakljwwginaib" }
  });

  const comLog = await communication.create({
    content:headxx + "//?//" + para,
    mail:to
  })

  const mailOptions = {
    from: "arnav2512thakare@gmail.com", to, subject, /*bcc:"itsarnav.thakare@gmail.com",*/
    text: "Please Use an html-mail compactible device  !" + "\n" + reasonTxt, html: await header(comLog._id) + await body(headxx, para, btn1, btn2, img) + await footer(reasonTxt)
  };

  const info = await transporter.sendMail(mailOptions, async(err, info) => err ? err : info);
  return info
};

module.exports = mail;