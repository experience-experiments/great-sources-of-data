'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'datasource-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },
  
  parse: {
    appID:     		process.env.PARSE_APP_ID 	 	|| 'p8GR4aBok0VQ4sXPWoEXSD2Y3xhqDRrqjv4fEjtn',
    clientKey: 		process.env.PARSE_CLIENT_KEY 	|| 'VE7GpO6C42FxeQZd9jlShm6bW2mz9UrQiDNSGRL1',
    javascriptKey: 	process.env.PARSE_JAVASCRIPT_KEY|| 'gR80DrqRpinCOrpNG6XzQPN6b8RspBMj2J8p7ANh',
    restApiKey: 	process.env.PARSE_REST_KEY 		|| 'X6Ix7zicquIAdlLoS5keBXf2YK2lhwJx00K1IY0F'
   },
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});