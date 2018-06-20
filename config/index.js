const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number().default(4040),
  MONGO_HOST: Joi.string()
    .required()
    .description('Mongo DB host url'),
  MONGO_DBNAME: Joi.string(),
  MONGO_PORT: Joi.number().default(27017),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongodb: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
    dbname: envVars.MONGO_DBNAME,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    get connectionUri() {
      let uri = 'mongodb://';

      if (this.username && this.password) {
        uri = `${uri}${this.username}:${this.password}@`;
      }

      uri = `${uri}${this.host}`;

      if (this.port) {
        uri = `${uri}:${this.port}`;
      }

      if (this.dbname) {
        uri = `${uri}/${this.dbname}`;
      }

      return uri;
    },
  },
};

module.exports = config;
