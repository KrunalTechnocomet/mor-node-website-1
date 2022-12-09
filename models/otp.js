'use strict';

const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');
const shortId = require('shortid');
const { otpTypes } = require('../constants/otp.js');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};
const otpId = () => Math.floor(100000 + Math.random() * 900000);
const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const OtpListSchema = new Schema({
  id: { type: String, default: uuid, unique: true },
  // userId: { type: String, required: getRequiredFiledMessage('User ID') },
  input: { type: String, required: getRequiredFiledMessage('input') },
  otp: { type: String, default: otpId(), required: getRequiredFiledMessage('OTP') },
  type: { type: String, enum: otpTypes, required: getRequiredFiledMessage('OTP type') },
  signUpToken: { type: String },
  countryCode: { type: String },
  mobileVerified: { type: String },
  resendCount: { type: Number, default: 1 }
}, options);

OtpListSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

module.exports = mongoose.model('Otp', OtpListSchema);

