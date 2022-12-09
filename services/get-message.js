"use strict";

const msg = `Note: This is an auto generated mail. 
                    Please do not reply to this mail.`;

function getEmailMessage(input, otp) {
  return `Dear user,<br/><br/>
            Thanks for registering on MOR <br/><br/>
            Your OTP for ${input} is <br/><br/> 
            <strong>${otp}</strong><br/><br/>
            PLEASE DO NOT SHARE IT WITH ANYONE!<br/><br/>
            TEAM MOR.<br/>
            ${msg}`;
}

function getEmailForPasswordReset(input, otp) {
  return `Dear user,<br/><br/>
            Your OTP for password reset is 
            <strong>${otp}</strong><br/><br/>
            PLEASE DO NOT SHARE IT WITH ANYONE!<br/><br/>
            TEAM MOR.<br/>
            ${msg}`;
}

function getEmailForChangeRequest(input, otp) {
  return `Dear user,<br/><br/>
            Your OTP for chnaging email is 
            <strong>${otp}</strong><br/><br/>
            PLEASE DO NOT SHARE IT WITH ANYONE!<br/><br/>
            TEAM MOR.<br/>
            ${msg}`;
}

function getSMSMessage(input, otp) {
  return `Dear user,
    Thanks for registering 
    on MOR 
    Your OTP for ${input} is 
    ${otp}.
    PLEASE DO NOT SHARE IT 
    WITH ANYONE!
    TEAM MOR.`;
}

function smsMessageForPasswordReset(otp) {
  return `Dear user, 
    Your OTP for password reset is 
    ${otp}.
    PLEASE DO NOT SHARE IT 
    WITH ANYONE!
    TEAM MOR.`;
}

function smsMessageForChangeRequest(otp) {
  return `Dear user, 
    Your OTP for changing phone number is 
    ${otp}.
    PLEASE DO NOT SHARE IT 
    WITH ANYONE!
    TEAM MOR.`;
}

function smsMessageForMobileVerification(otp) {
  return `Dear user, 
    Your OTP for verify phone number is 
    ${otp}.
    PLEASE DO NOT SHARE IT 
    WITH ANYONE!
    TEAM MOR.`;
}

function getEmailForVerification(otp) {
  return `Dear user, 
    Your OTP for verification of email is 
    ${otp}.
    PLEASE DO NOT SHARE IT 
    WITH ANYONE!
    TEAM MOR.`;
}

module.exports = {
  getEmailMessage,
  getEmailForPasswordReset,
  getEmailForChangeRequest,
  getSMSMessage,
  smsMessageForPasswordReset,
  smsMessageForChangeRequest,
  smsMessageForMobileVerification,
  getEmailForVerification,
};
