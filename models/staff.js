const autoIncrement = require ("mongoose-auto-increment");
const mongoose = require ("mongoose");

const { staffRoles, ZONAL_HEAD, ADMIN, CLUB, COUNTRY_HEAD } = require ("../constants/roles.js");

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const rolebasedReqiredValidation = (requiredRoles, actualRole) => {
  if (requiredRoles.includes(actualRole)) {
    return true;
  }
  return false;
};

const StaffSchema = new Schema(
  {
    id: { type: Number, unique: true },
    firstName: {
      type: String,
      required: getRequiredFiledMessage("firstName"),
      trim: true,
    },
    lastName: {
      type: String,
      required: getRequiredFiledMessage("lastName"),
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    displayName: {
      type: String,
      required: getRequiredFiledMessage("lastName"),
      trim: true,
    },
    profileImage: String,
    dob: {
      type: Date,
      required: getRequiredFiledMessage("DoB"),
      trim: true,
    },
    phone: {
      type: String,
      required: getRequiredFiledMessage("phone"),
      trim: true,
      unique: true,
    },
    secondaryPhone: {
      type: String,
      trim: true,
    },
    officialPhone: {
      type: String,
      trim: true,
    },
    employeeId: {
      type: String,
      required: getRequiredFiledMessage("employeeId"),
      trim: true,
      unique: true,
    },
    personalEmail: {
      type: String,
      required: getRequiredFiledMessage("personalEmail"),
      trim: true,
      unique: true,
    },
    officialEmail: {
      type: String,
      required: getRequiredFiledMessage("officialEmail"),
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: staffRoles,
      trim: true,
      required: getRequiredFiledMessage("role"),
    },
    // countryCode: {
    //   type: String,
    //   required: getRequiredFiledMessage('countryCode'),
    //   trim: true,
    // },
    reportsTo: {
      type: Number,
      // required() {
      //   return rolebasedReqiredValidation([ADMIN, ZONAL_HEAD, CLUB, COUNTRY_HEAD], this.role);
      // },
      trim: true,
    },
    hr: {
      type: String,
      // required() {
      //   return rolebasedReqiredValidation([ADMIN, ZONAL_HEAD, CLUB, COUNTRY_HEAD], this.role);
      // },
      trim: true,
    },
    country: {
      type: String,
      required() {
        return rolebasedReqiredValidation(
          [ADMIN, ZONAL_HEAD, CLUB, COUNTRY_HEAD],
          this.role
        );
      },
      trim: true,
    },
    countryHead: {
      type: String,
      required() {
        return rolebasedReqiredValidation([ADMIN, ZONAL_HEAD, CLUB], this.role);
      },
      trim: true,
    },
    zone: {
      type: String,
      required() {
        return rolebasedReqiredValidation([ZONAL_HEAD], this.role);
      },
    },
    zonalHead: {
      type: String,
    },
    admin: {
      type: String,
      required() {
        return rolebasedReqiredValidation([CLUB], this.role);
      },
    },
    morId: {
      type: String,
      required: getRequiredFiledMessage("morId"),
      trim: true,
    },
    password: {
      type: String,
      required: getRequiredFiledMessage("password"),
    },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    loginIp: { type: String, default: "" },
    lastLogin: { type: Date, default: Date.now },
    lastFailedLogin: Date,
    currentLogin: { type: Date, default: Date.now },
  },
  options
);

StaffSchema.plugin(autoIncrement.plugin, {
  model: "Staff",
  field: "id",
  startAt: 100000,
});
module.exports = mongoose.model("Staff", StaffSchema);
