const fs = require('fs');

const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const fromEmail = 'Sebasaku <no-reply@sebasaku.com>';

const options = {
  auth: {
    api_key: process.env.APIKEYPASS
  }
};

// setup transporter
const transporter = nodemailer.createTransport(sgTransport(options));
transporter.use('compile', htmlToText());

// supported email templates
const emailTypes = {
  emailCodeForgotPassword: {
    file: 'email_forgot_password.html',
    subject: 'Sebasaku - Your Forgot Code',
    replacer(body, data) {
      return body.replace('{CODE}', data.code).replace('{EMAIL}', data.email);
    }
  }
};

module.exports = {
  send(type, data, cb) {
    // only process supported type
    const emailTypeData = emailTypes[type];

    if (emailTypeData) {
      const filePath = `${__dirname}/emails/templates/${emailTypeData.file}`;
      fs.readFile(filePath, (err, emailBodyMd) => {
        if (!err) {
          let emailBody = emailBodyMd.toString();
          emailBody = emailTypeData.replacer(emailBody, data);

          const mailOptions = {
            from:
              typeof data.fromEmail !== 'undefined'
                ? data.fromEmail
                : fromEmail,
            to: data.email,
            subject: emailTypeData.subject,
            html: emailBody
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              cb(err);
            } else {
              cb(null, info);
            }
          });
        }
      });
    }
  }
};
