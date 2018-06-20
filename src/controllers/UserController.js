// Lib
const crypto = require('crypto');
const phone = require('phone');
const Utils = require('../helpers/Utils');
const Email = require('../helpers/Email');
const Sms = require('../helpers/Sms');
const log = require('../helpers/Logger');

// Model
const User = require('../model/User');
module.exports = {
  register: async (req, res) => {
    const missing = Utils.missingProperty(req.body, ['fullname', 'password']);
    if (missing) {
      return res.error(`Missing parameter : ${missing}.`, 400);
    }
    if (req.body.email) {
      const email = Utils.checkValidateEmail(req.body.email);
      if (!email) {
        return res.error('Incorrect email', 400);
      }
      const userFromEmail = await User.findOne({ email: req.body.email });
      if (userFromEmail) {
        return res.error('This email is already used.', 401);
      }
    }
    if (req.body.phone) {
      if (req.body.phone.toLowerCase().replace(/ /g, '').length < 9) {
        return res.error('Minimum length of mobile phone is 9 digits');
      }
      if (
        req.body.phone.indexOf(0) === 0 ||
        req.body.phone.indexOf(0) === '0'
      ) {
        req.body.phone = `${req.body.phone.substr(
          0,
          0
        )}+62${req.body.phone.substr(1)}`;
      }
      if (phone(req.body.phone, '').length === 0) {
        return res.error('Format mobile phone number not valid');
      }
      const userFromPhone = await User.findOne({ phone: req.body.phone });
      if (userFromPhone) {
        return res.error('This phone number is already used.');
      }
    }

    if (req.body.password !== req.body.repassword) {
      return res.ok(null, 'Password Not Match', 400);
    }
    try {
      const userNew = new User({
        email: req.body.email,
        phone: req.body.phone,
        password: crypto.createHmac('sha256', req.body.password).digest('hex'),
        fullname: req.body.fullname,
        firebaseToken: req.body.firebaseToken
      });
      const result = await userNew.save();
      const code = Utils.activationCode(4).toUpperCase();
      const dataNotif = {
        phoneNo: result.phone,
        message: `Wellcome To MyApps your OTP is ${code}`,
        code,
        email: result.email
      };
      if (result) {
        const sendSMS = await Sms.sendSMS(dataNotif);
        if (sendSMS.data.results[0].status) {
          await User.findByIdAndUpdate(result.id, {
            $set: { phoneStatus: 1 }
          });
        }
        Email.send('emailCodeForgotPassword', dataNotif, () => {});
      }
      res.ok(result, 'ok', 200);
    } catch (error) {
      log.error(error);
    }
  }
};
