const moment = require('moment-timezone');

exports.useTimestamps = (schema, options) => {
  schema.add({
    createdDate: Date,
    updatedDate: Date
  });

  schema.pre('save', function(next) {
    if (!this.createdDate) {
      this.createdDate = this.updatedDate = moment()
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DDTHH:mm:ss');
    } else {
      this.updatedDate = moment()
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DDTHH:mm:ss');
    }

    next();
  });
};
