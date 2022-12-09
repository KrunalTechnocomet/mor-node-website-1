"use strict";

const PENDING = "PENDING";
const APPROVED = "APPROVED";
const REJECTED = "REJECTED";
const WAITLISTED = "WAITLISTED";

const applicationForOfficialHostStatus = [
  PENDING,
  APPROVED,
  REJECTED,
  WAITLISTED,
];
const applicationForOfficialHostStatusObj = {
  PENDING,
  APPROVED,
  REJECTED,
  WAITLISTED,
};

module.exports = {
  applicationForOfficialHostStatus,
  applicationForOfficialHostStatusObj,
  PENDING,
  APPROVED,
  REJECTED,
  WAITLISTED,
};
