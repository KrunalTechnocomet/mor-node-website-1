'use strict';

const accountSid = "ACc7529c23d86d80fc44bed2a8e7280d5e";
const authToken = "53c4b11f48b0a7c0ba56be088d4e951b";

const Twilio = require('twilio');

const client = Twilio(accountSid, authToken)
exports.sendSMS =async (message, to) =>{
    let res = true;
    await client.messages
        .create({
            body: message,
            messagingServiceSid: process.env.MESSAGE_SERVICE_ID,
            to: to
        })
        .then(message => console.log('message send'))
        .catch((err) => {
            res = false;
        })
        .done();
    return res;
}
