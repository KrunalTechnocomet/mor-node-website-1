'use strict';

const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const MOBILE_VERIFICATION_REQUEST = 'MOBILE_VERIFICATION_REQUEST';
const EMAIL_VERIFICATION_REQUEST = 'EMAIL_VERIFICATION_REQUEST';
const NEWUSER_LOGIN_VERIFICATION_REQUEST = 'NEWUSER_LOGIN_VERIFICATION_REQUEST';
const OFFICIAL_HOST_VERIFICATION_REQUEST = 'OFFICIAL_HOST_VERIFICATION_REQUEST';


const verifyRequestType = [
   REGISTRATION_REQUEST,
   LOGIN_REQUEST,
   MOBILE_VERIFICATION_REQUEST,
   EMAIL_VERIFICATION_REQUEST,
   NEWUSER_LOGIN_VERIFICATION_REQUEST,
   OFFICIAL_HOST_VERIFICATION_REQUEST
];

module.exports = {
    REGISTRATION_REQUEST,
    LOGIN_REQUEST,
    MOBILE_VERIFICATION_REQUEST,
    EMAIL_VERIFICATION_REQUEST,
    NEWUSER_LOGIN_VERIFICATION_REQUEST,
    OFFICIAL_HOST_VERIFICATION_REQUEST,
    verifyRequestType
};

