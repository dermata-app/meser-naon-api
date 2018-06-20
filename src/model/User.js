const mongoose = require('mongoose');
const timestamp = require('./plugins/timestamp');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true
    },
    phone: {
      type: String,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true,
      index: true
    },
    fullname: {
      type: String,
      required: true,
      index: true
    },
    firebaseToken: {
      type: String
    },
    activationCode: {
      type: String
    },
    forgotCode: {
      type: String
    },
    phoneStatus: {
      type: Boolean,
      default: 0
    },
    emailStatus: {
      type: Boolean,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      default: 0
    }
  },
  {
    collection: 'user',
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);
UserSchema.method('toJSON', function() {
  const data = this.toObject();
  delete data.__v;
  delete data._id;
  delete data.emailStatus;
  delete data.isDeleted;
  delete data.phoneStatus;
  delete data.forgotCode;
  delete data.activationCode;
  delete data.password;
  return data;
});

UserSchema.plugin(timestamp.useTimestamps);
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
