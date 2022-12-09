
const User = require('../../models/user.js');
const Otp = require('../../models/otp.js');
const { v4: uuid } = require('uuid');
const { REGISTRATION_REQUEST, MOBILE_VERIFICATION_REQUEST, EMAIL_VERIFICATION_REQUEST, NEWUSER_LOGIN_VERIFICATION_REQUEST } = require('../../constants/verifyRequestType.js');
const { InvalidOtpError, InvalidInputError, AbsenceOfRequiredFieldError, UserAlreadyExist } = require('../../errors/auth.js');
const { VERIFY_MOBILE, VERIFY_EMAIL, NEWUSER_LOGIN_REQUEST, VERIFY_OFFICIAL_HOST } = require("../../constants/otp.js");

exports.verifyOTP = async (req, res, next) => {

    const { otp, input} = req.body
    console.log(req.body,);
    var verifyType = VERIFY_OFFICIAL_HOST
    if (!otp) {
        const error = new AbsenceOfRequiredFieldError('OTP');
        return next(error);
    }

    if (!verifyType) {
        const error = new AbsenceOfRequiredFieldError('Verify Type');
        return next(error);
    }

    if (!input) {
        const error = new AbsenceOfRequiredFieldError('Input');
        return next(error);
    }

    try {

        const user = await User.findOne({ morId: input }).lean();

        const phoneNumberPattern = user?.mobile.match(/^(?:(\+(\d{1,2}))[ -])?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})$/) ? true : false;
       
        if (!phoneNumberPattern) {
            const error = new InvalidInputError('Input.');
            return next(error);
        }

        const otpExist = await Otp.findOne({ input:user?.morId, otp });
        console.log(otpExist);
        if (!otpExist) {
            const error = new InvalidOtpError();
            return next(error);
        }

        switch (verifyType) {
            case VERIFY_OFFICIAL_HOST:
                otpExist.mobileVerified = uuid();
                await otpExist.save();

                res.json({
                    message: 'OTP verified.',
                    status: true,
                    statusCode: 200,
                    // mobileVerified:  otpExist.mobileVerified ,
                    response: {
                        // morId: results.morId
                        verification: true
                    }
                });
                break;

            default:
                const error = new InvalidOtpError();
                return next(error);
        }

    } catch (error) {
        next(error);
    }
}
