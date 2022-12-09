'use strict';

import Twilio from 'twilio';
import config from 'config';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken)

async function sendSMS(to, options) {
  const defaultOptions = {
    from: config.get('SMS_FROM'),
    body: config.get('SMS_BODY'),
  };

  if (!to) {
    throw new Error('To Mobile Number Should Not Be Empty');
  }

  const messageParams = {
    ...defaultOptions,
    ...options,
    to,
  };

  return client.messages
    .create(messageParams);
}

export {
  sendSMS,
};
