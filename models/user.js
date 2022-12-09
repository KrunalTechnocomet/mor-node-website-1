"use strict";

const mongoose = require("mongoose");

const autoIncrement = require('mongoose-auto-increment');
const { v4: uuid } = require("uuid");
const { roles, USER } = require("../constants/roles.js");
const { genders, MALE } = require("../constants/genders.js");
const { deleteTypes, SOFT_DELETE } = require("../constants/delete-types.js");
const { vipLevels, SILVER } = require("../constants/vip-levels.js");

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const SocialSchema = new Schema({
  socialUniqueId: String,
  email: String,
  userName: String,
});
const StarBeansSchema = new Schema({
  currentDate: { type: Date, default: new Date() },
  beans: Number,
});
const deleteSchema = new Schema({
  deletedDate: { type: Date, default: new Date() },
  deletedType: {
    type: String,
    enum: deleteTypes,
    default: SOFT_DELETE,
    required: getRequiredFiledMessage("Delete Type"),
  },
});
const profileVisitSchema = new Schema(
  {
    userId: String,
    VistedCount: Number,
    LastVisited: { type: Date, default: new Date() },
  },
  options
);
const UserSchema = new Schema(
  {
    tempMorId: { type: Number, unique: true },
    staffMorId: { type: String },
    id: {
      type: String,
      default: uuid,
      unique: true,
    },
    morId: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      trim: true,
      // ,required: getRequiredFiledMessage('Full Name'),
    },
    displayName: {
      type: String,
      trim: true,
      required: getRequiredFiledMessage("Display Name"),
    },
    email: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    countryCode: {
      type: String,
      trim: true,
      required: getRequiredFiledMessage("Country Code"),
    },
    countryName: {
      type: String,
      trim: true,
      required: getRequiredFiledMessage("Country Name"),
    },
    dob: {
      type: String,
      required: getRequiredFiledMessage("DOB"),
    },
    gender: {
      type: String,
      enum: genders,
      default: MALE,
      required: getRequiredFiledMessage("Gender"),
    },
    talentTags: [String],
    isOfficialHost: {
      type: Boolean,
      default: false,
    },
    sessionId: { type: String },
    isCelebrity: {
      type: Boolean,
      default: false,
    },
    ageProofs: [String],
    role: {
      type: String,
      enum: roles,
      default: USER,
      trim: true,
    },
    displayImage: {
      type: String,
    },
    bio: {
      type: String,
    },
    selfie: String,
    clubId: Number,
    password: {
      type: String,
    },
    isVip: {
      type: Boolean,
      default: false,
    },
    vipLevel: {
      type: String,
      enum: vipLevels,
      default: SILVER,
      trim: true,
    },
    google: {
      type: SocialSchema,
    },
    facebook: {
      type: SocialSchema,
    },
    twitter: {
      type: SocialSchema,
    },
    apple: {
      type: SocialSchema,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    language: {
      type: String,
    },
    blockedUsers: {
      type: [String],
      unique: true,
    },
    blockedByUser: {
      type: [String],
    },
    // to identify that user is login through email or phone
    signUpThrough: {
      type: String,
    },
    profileVisitedByUsers: {
      type: [profileVisitSchema],
    },
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    loginIp: { type: String, default: "" },
    lastLoginProvider: { type: String, default: "" },
    currentLoginProvider: { type: String, default: "" },
    lastLogin: { type: Date, default: Date.now },
    lastFailedLogin: Date,
    currentLogin: { type: Date, default: Date.now },
    followingCount: { type: Number, default: 0 },
    fansCount: { type: Number, default: 0 },
    friendsCount: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    expPoints: { type: Number, default: 0 },
    nextLevel: { type: Number, default: 100 },
    diamonds: { type: Number, default: 0 },
    beans: { type: Number, default: 0 },
    sentDiamonds: { type: Number, default: 0 },
    receivedBeans: { type: Number, default: 0 },
    isOnline: { type: Boolean, default: false },
    diviceToken: { type: String, default: "" },
    starBeans: {
      type: StarBeansSchema,
    },
    deleteObj: {
      type: deleteSchema,
    },
    superModerator: {
      type: String,
    },
    moderators: {
      type: [String],
      maxItems: 6,
    },
    isProfileCompleted: { type: Boolean, default: false },
    lastVisitedProfileTime: { type: Date },
    security_pin: { type: String, default: "" },
  },
  options
);
autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {
  model: "User",
  field: "tempMorId",
  startAt: 2,
});

UserSchema.pre("save", async function (next) {
  try {
    const zeroPad = (num, places) => String(num).padStart(places, "0");
    var morId = "M" + zeroPad(this.tempMorId, 10);
    this.morId = morId; // "M0000000002"

    next();
  } catch (error) {
    throw {
      message: error.message,
    };
  }
});

module.exports = mongoose.model("User", UserSchema);
