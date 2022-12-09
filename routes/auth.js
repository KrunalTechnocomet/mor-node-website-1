var express = require('express');
const { getStatesList } = require('../controllers/auth/getCounrtyList.js');
var router = express.Router();
var authSendOtpController = require('../controllers/auth/send-otp.js');
var authVerifyOTPController = require('../controllers/auth/verify-otp.js');


/* GET users listing. */
router.post('/send-otp-for-morId-verification',authSendOtpController.sendOTPForMorIdVerfication)
router.post('/morId-verification',authVerifyOTPController.verifyOTP)
router.get('/ContryStat',getStatesList);
  
module.exports = router;
