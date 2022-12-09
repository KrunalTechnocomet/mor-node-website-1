'use strict';

const VERIFY_EMAIL = 'verify_email';
const VERIFY_MOBILE = 'verify_mobile';
const RESET_PASSWORD = 'reset_password';
const CHANGE_REQUEST = 'change_request';
const NEWUSER_LOGIN_REQUEST = 'newUser_login_request';
const VERIFY_OFFICIAL_HOST = 'verify_official_host';

const otpTypes = [
    VERIFY_EMAIL,
    VERIFY_MOBILE,
    RESET_PASSWORD,
    CHANGE_REQUEST,
    NEWUSER_LOGIN_REQUEST,
    VERIFY_OFFICIAL_HOST
];

module.exports = {
    VERIFY_EMAIL,
    VERIFY_MOBILE,
    RESET_PASSWORD,
    CHANGE_REQUEST,
    NEWUSER_LOGIN_REQUEST,
    VERIFY_OFFICIAL_HOST,
    otpTypes
};