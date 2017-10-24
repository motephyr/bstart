/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */
require('./domains')
var Bookshelf = require('./base');

var User = Bookshelf.Model.extend({
  idAttribute: "_id",
  tableName: "users",
  domains: function () {
    // one-to-many
    return this.hasMany('Domain', 'user_id', '_id');
  },
  hidden: ['encrypted_password', 'reset_password_token', 'reset_password_sent_at', 'remember_created_at', 'current_sign_in_ip', 'last_sign_in_ip', 'token', 'authentication_token', 'confirmation_token', 'confirmed_at', 'confirmation_sent_at', 'unconfirmed_email',
  'derived_key', 'salt', 'signupToken', 'signupTimestamp', 'signupTokenExpires', 'failedLoginAttempts', 'emailVerificationTimestamp', 'emailVerified', 'pwdResetTokenExpires', 'accountLockedUntil', 'previousLoginTime', 'previousLoginIp', 'currentLoginTime', 'currentLoginIp', 'authenticationToken'],
  // accountLocked, pwdResetToken

});

var Users = Bookshelf.Collection.extend({
  model: User
});

module.exports = {
  User: Bookshelf.model('User', User),
  Users: Bookshelf.collection('Users', Users)
}
