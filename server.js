const express = require("express");//Import required libraries
const cors = require("cors");
require("dotenv").config({ path: "./.env" });//Import required in-house libraries
const connectToDB = require("./db.config.js");
const errorHandler = require("./middleware/error");
const port = process.env.PORT || 8001;
const bodyParser = require('body-parser');

const app = express();//Configure Server & connect to DB
app.use(cors());
app.use(express.json());
connectToDB();
app.use(express.static("public"));
app.use(bodyParser.json({limit: '1mb'}));
app.use("/api/", require("./api"));

app.get("/", (req, res, next) => res.send({response:"Server is running !!"}));//Configure routes & handle errors


app.get('/get-ip', (req, res) => {
    const ipAddress = req.ip;
    res.send({res:`Your IP address is: ${ipAddress}`, ip:req.headers['x-forwarded-for']});
  });

// Handle tracking pixel requests
const handleTrackingPixel = async (req, res) => {
    const { email, id } = req.query;
    const event = req.path.substring('/tracking/'.length);
  
    // Log the event in your database or do other actions
    console.log(`Email ${event}: ${email}, ID: ${id}`);
  
    // Return a transparent 1x1 pixel image
    res.set('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64'));
};
  
// Set up the tracking pixel endpoints
app.get('/tracking/open', handleTrackingPixel);
app.get('/tracking/click', handleTrackingPixel);


app.post(':filename', (req,res) => res.sendFile(__dirname + `/public/${req.params.filename}`))
app.get(':filename', (req,res) => res.sendFile(__dirname + `/public/${req.params.filename}`))
app.use(errorHandler);

app.listen(port, () => console.log(`DigiSchool Server is serving now !`));