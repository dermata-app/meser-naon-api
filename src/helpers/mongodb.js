const mongoose = require('mongoose');

const config = require('../../config');
const log = require('./Logger');

// Use native promises
mongoose.Promise = global.Promise;

const options = {
  // useMongoClient: true,
  reconnectTries: Number.MAX_VALUE,
  autoReconnect: true,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0
};
mongoose.connect(
  config.mongodb.connectionUri,
  options
);
const db = mongoose.connection;
db.on('error', err => {
  log.error('Error connect to MongoDB', err);
});
db.once('open', () => {
  log.info('Successfully connect to mongodb');
});
