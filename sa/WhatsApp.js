const { Client, LocalAuth,Buttons, List } = require('whatsapp-web.js');
const express = require("express");
const qrcode = require('qrcode-terminal');
const router = express.Router();
const tryCatch = require("../utils/tryCatch");
const communication = require('../models/communication');

const client = new Client({ authStrategy: new LocalAuth() });
var WaStatus = 0;

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', qr => {
    // console.log('====================================');
    // console.log('====================================');
    console.log("Scan this QR Code to Activate WhatsApp-Chatbot !!!!!");
    // qrcode.generate(qr, {small: true});
    // console.log('====================================');
    // console.log('====================================');
    // console.log('====================================');
});

client.on('ready', async() => {
    WaStatus = 1;

    /*try{
        const productsList = new List ("Amazing deal on these products", "View products", [
            {
                title: "Products list",
                rows: [
                    { id: "apple", title: "Apple" },
                    { id: "mango", title: "Mango" },
                    { id: "banana", title: "Banana" },
                ],
            },
        ], "Please select a product");
    
        
        const number_details = await client.getNumberId("919119471079");
        console.log(number_details);
        const sendMessageData = await client.sendMessage (number_details._serialized, productsList);
        client.sendMessage(number_details._serialized, "button");
        console.log('Logged In to WhatsApp !!');
    }catch(ee){
        console.log('====================================');
        console.log(ee);
        console.log('====================================');
    }*/
});

client.on('message', msg => {
    /*if (msg.body.toLowerCase() == 'hi' || msg.body.toLowerCase() == 'hello') {
        msg.reply('Hey there ! \n\n What would you like me to do ?');
    }*/
});

tryCatch(router, "status", 0, async(req, res) => {
    return res.send({WaStatus})
});

const WaGet = () => {
    return WaStatus ? true : false;
}
 
client.initialize().catch(err => {
    console.log('================Error in WhatsApp=================');
    console.log(err);
    console.log('====================================');
    return;
});

module.exports = {WaRouter:router, WaClient:async(phoneNo, msg)=>{
    if(!WaGet()) return;

    var phone = phoneNo;
    if(phoneNo.toString().length == 10) phone = "91" + phoneNo;

    const number_details = await client.getNumberId(phone); // get mobile number details
    console.log(number_details);

    if (number_details) {
        const comLog = await communication.create({type:true, content:msg, phone:number_details._serialized})
        await client.sendMessage(number_details._serialized, msg); // send message
        return;
    }else{
        console.log("Phone Number : " + phone + " not found on WhatsApp. Function Aborted !");
        return;
    }

}, WaGet}