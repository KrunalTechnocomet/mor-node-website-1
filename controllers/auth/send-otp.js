"use strict";
const User = require("../../models/user.js");
const Otp = require("../../models/otp.js");
const { sendEmail } = require("../../services/aws-ses.js");
const { sendSMS } = require("../../services/twilio.js");
const {
  VERIFY_MOBILE,
  VERIFY_EMAIL,
  NEWUSER_LOGIN_REQUEST,
  VERIFY_OFFICIAL_HOST
} = require("../../constants/otp.js");
const {
  blocked_country_codes,
} = require("../../constants/blocked-countries.js");
const {
  MOBILE_VERIFICATION_REQUEST,
  EMAIL_VERIFICATION_REQUEST,
} = require("../../constants/verifyRequestType.js");
const {
  getEmailForVerification,
  getEmailMessage,
  getSMSMessage,
  smsMessageForMobileVerification,
} = require("../../services/get-message.js");
const {
  DataAlreadyExistsError,
  ExceedRequestQuota,
  AbsenceOfRequiredFieldError,
  InvalidInputError,
  FailedOperationError,
  UserAlreadyExist,
  SignUpInCompleteError,
  duplicateKey,
} = require("../../errors/auth.js");
const { SENDER_EMAIL } = require("../../constants/send-email-address.js");
const applicationOfficialHost = require("../../models/applicationofficialhost.js");

const shortId = () => Math.floor(100000 + Math.random() * 900000);

// Send otp for Mobile No Verification
const sendOTPForMorIdVerfication = async (req, res, next) => {
  try {
    const { input } = req.body;
    console.log(req.body);
    const newOTP = true
    // If input is empty

    if (!input) {
      const error = new AbsenceOfRequiredFieldError("Mor ID");
      return next(error);
    }

    // login user can only verify his mobile no or email
    // If user already exists
    const user = await User.findOne({ morId: input }).lean();
    if (!user) {
      const error = new InvalidInputError("User");
      return next(error);
    }
    if (!user.isProfileCompleted) {
      const error = new SignUpInCompleteError();
      return next(error);
    }

    const userExist = await applicationOfficialHost.findOne({
      mobile: input,
    });
    if (userExist) {
      const IsUserExistInOfficialHost = userExist.morId == user.morId;

      if (!IsUserExistInOfficialHost) {
        const error = new UserAlreadyExist();
        return next(error);
      }
    }
    // const isUserValid = user.id == userId;
    // if (!isUserValid) {
    //   const error = new UserAlreadyExist();
    //   return next(error);
    // }

    // If OTP Already Exists
    const otpExist = await Otp.findOne({
      $or: [
        { input: user?.mobile, countryCode: user?.countryCode },
        { input: user?.email},
      ],
    });

    // If new OTP request then send new OTP else send the existing one
    const otp = newOTP ? shortId() : otpExist?.otp ?? shortId();

    if (otpExist) {
      if (otpExist?.resendCount >= 9) {
        const error = new ExceedRequestQuota();
        return next(error);
      }
    }

    if (user?.mobile) {
      const isOtpSend = await sendSMS(
        smsMessageForMobileVerification(otp),
        input
      );
      if (!isOtpSend) {
        const error = new FailedOperationError("Sent OTP");
        return next(error);
      }

      

      if (!otpExist) {
        const data = {
          input,
          otp,
          countryCode:user?.countryCode,
          type: VERIFY_OFFICIAL_HOST,
          resendOTP: 1,
        };
        const newOtp = new Otp(data);
        await newOtp.save();
        console.log(input,otp);
        return res.json({
          status: true,
          countryCode:user?.countryCode,
          message: "OTP Sent",
          statusCode: 200,
          response: { input: input, otp: otp },
        });
      }

      // If newOTP is requested updating the new otp and resetting resendCount or else increasing the count
      newOTP
        ? await Otp.findOneAndUpdate(
            { input },
            { otp, $inc: { resendCount: 1 } },
            { upsert: true }
          )
        : await Otp.findOneAndUpdate(
            { input },
            { $inc: { resendCount: 1 } },
            { upsert: true }
          );
        console.log(input,otp);
      return res.json({
        status: true,
        message: "OTP Sent For Mor ID Verification",
        statusCode: 200,
        response: { input: input, otp: otp },
      });
    }


  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendOTPForMorIdVerfication,
};
