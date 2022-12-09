
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { applicationForOfficialHostStatus, PENDING } = require('../constants/application-official-host.js');
const { hostTypes } = require('../constants/host-types.js');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const getRequiredFieldMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const OfficialHost = new Schema({
  // This field specifies the id of the application
  id: { type: String, unique: true },
  // this field specifies the morId of the user applying
  morId: {
    type: String,
    required: getRequiredFieldMessage('Mor ID'),
    trim: true,
  },
  // this is the country of the user is in
  country: {
    type: String,
    required: getRequiredFieldMessage('Country'),
  },
  // state of the user
  state: {
    type: String,
    required: getRequiredFieldMessage('State'),
  },
  // city of the user
  city: {
    type: String,
    // required: getRequiredFieldMessage('City'),
  },
  // talent tags are the talents of the user
  talentTags: {
    type: [String],
  },
  // the type of host the user is either a official Host or a celebrity of both
  hostTypes: {
    type: String, // officalhost or celebrity or both
    default: true,
    required: getRequiredFieldMessage('Host Types'),
    enum: hostTypes
  },
  // these are the documents of the user for age proof
  ageProof: {
    type: {
      front: {
        type: String,
        required: getRequiredFieldMessage('Age Proof front'),
      },
      back: {
        type: String,
        // required: getRequiredFieldMessage('Age Proof back'),
      },
    },
    required: getRequiredFieldMessage('Age Proof URL'),
  },
  // these are the documents of the user for address proof
  addressProof: {
    type: {
      front: {
        type: String,
        required: getRequiredFieldMessage('address Proof front'),
      },
      back: {
        type: String,
        // required: getRequiredFieldMessage('address Proof back'),
      },

    },
    required: getRequiredFieldMessage('Address Proof URL'),
  },
  // this is the phone number of the user
  mobile: {
    type: String,
    required: getRequiredFieldMessage('PhoneNo'),
  },
  countryCode: {
    type: String,
    required: getRequiredFieldMessage('Coutry Code'),
  },
  // the selfie of the user
  selfie: {
    type: String,
    required: getRequiredFieldMessage('Selfie URL'),
  },
  // profile pic url
  profilePic: {
    type: String,
    required: getRequiredFieldMessage('Profile Pic URL'),
  },
  status: {
    enum: applicationForOfficialHostStatus,
    type: String,
    default: PENDING,
  },
  // this field is the club the user wants to join, if not specified will be updated later
  clubId: {
    type: String,
  },
  // this boolean tag is know whether the user is approved or not
  isApproved: {
    type: Boolean,
    default: false,
  },
  displayName: {
    type: String
  },
  zone: {
    type: String,
    required: getRequiredFieldMessage('Zone'),
  },
  zoneName: {
    type: String,
    required: getRequiredFieldMessage('Zone Name'),
  },
  clubId: {
    type: String
  },
  clubName: {
    type: String
  },
  clubOwner: {
    type: String
  },
  admin: {
    type: String
  }
}, options);
autoIncrement.initialize(mongoose.connection);
OfficialHost.plugin(autoIncrement.plugin, { model: 'OfficialHost', field: 'id', startAt: 1 });


module.exports = mongoose.model('officialHost', OfficialHost)
