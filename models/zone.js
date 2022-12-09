
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

// const { roles, USER } = require('../constants/roles');
// const { genders, MALE } = require('../constants/genders');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const ZoneSchema = new Schema({
  id: { type: String, default: uuid, unique: true },
  name: { type: String, required: getRequiredFiledMessage('Country') },
  country: String,
  createdBy: String,
  states: { type: [String], required: getRequiredFiledMessage('States') },
  isDeleted: { type: Boolean, default: false },
}, options);

module.exports = mongoose.model('Zone', ZoneSchema);
