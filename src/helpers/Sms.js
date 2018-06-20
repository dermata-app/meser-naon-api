const axios = require('axios');
const querystring = require('querystring');
module.exports = {
  sendSMS(smsData) {
    const urlNusa = 'http://api.nusasms.com/api/v3/sendsms/plain?';
    const queryObject = querystring.stringify({
      user: process.env.SMS_USER,
      password: process.env.SMS_PASS,
      SMSText: smsData.message,
      GSM: smsData.phoneNo.replace(smsData.phoneNo.substring(0, 3), '62'),
      output: 'json'
    });

    return axios.get(urlNusa + queryObject);
  }
};
