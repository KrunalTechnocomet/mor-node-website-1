'use strict';

// const AWS = require('aws-sdk');
const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'ap-south-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

exports.sendEmail = async (senderEmail, recipientEmail, message, dataType) => {
    const params = {
        Source: senderEmail,
        Destination: {
            ToAddresses: [recipientEmail],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: message,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: dataType, // Subject for Email
            },
        },
    };
    console.log('sending email');
    return AWS_SES.sendEmail(params).promise()
        .then(() => { return true })
        .catch((err) => { console.log(err); return false });

    // try {
    //     var result = await AWS_SES.sendEmail(params).promise();
    //     return true
    // } catch (error) {
    //     console.log("Error --> ",error); 
    //     return false 
    // }
    
};

