var secrets = require('./secrets.js');
exports.db = require('../knexfile.js');

// name for subject and email content
exports.appname = 'Gossim';

// url for proper link generation
exports.url = 'https://console.gossim.io';

// email settings (same as nodemailer)
// exports.emailType = (process.env.NODE_ENV === 'production') ? 'nodemailer-smtp-transport' : 'nodemailer-stub-transport';
exports.emailType = 'nodemailer-smtp-transport';
exports.emailSettings = {
  host: 'mx.vangro.com',
  port: 25,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 'cbm@vangro.com',
    pass: 'c29445999m'
  }
};

// whenever a library uses request under the hood (like nano in lockit-couchdb-adapter)
// the following values will be used
exports.request_defaults = {
  // proxy: 'http://someproxy'
};

// email template from npm
exports.emailTemplate = 'lockit-template-blank';

// render views or json for single page apps
exports.rest = false;

// or if you want to use rest
// exports.rest = {
//
//   // set starting page for single page app
//   index: 'public/index.html',
//
//   // use view engine (render()) or send static file (sendfile())
//   useViewEngine: false
//
// }

// signup settings
exports.signup = {
  route: '/signup',
  tokenExpiration: '1 day',
  views: {
    signup: 'lockit/get-signup.jade',         // input fields 'name', 'email' and 'password' | local variable 'error' | POST /'signup.route'
    linkExpired: 'lockit/link-expired.jade',    // message link has expired | input field 'email' | POST /'signup.route'/resend-verification
    verified: 'lockit/mail-verification-success.jade',       // message email is now verified and maybe link to /'login.route'
    signedUp: '',       // message email has been sent => check your inbox
    resend: ''          // input field 'email' | local variable 'error' | POST /'signup.route'/resend-verification
  },
  handleResponse: true  // let lockit handle the response after signup success
};

// login settings
exports.login = {
  route: '/login',
  logoutRoute: '/logout',
  views: {
    login: 'lockit/get-login.jade',          // input fields 'login' and 'password' | POST /'login.route' | local variable 'error'
    loggedOut: 'lockit/get-logout.jade'       // message that user logged out
  },
  handleResponse: false  // let lockit handle the response after login/logout success
};

// forgot password settings
exports.forgotPassword = {
  route: '/forgot-password',
  tokenExpiration: '1 day',
  views: {
    forgotPassword: 'lockit/get-forgot-password.jade', // input field 'email' | POST /'forgotPassword.route' | local variable 'error'
    newPassword: 'lockit/get-new-password.jade',    // input field 'password' | POST /'forgotPassword.route'/#{token} | local variable 'error'
    changedPassword: 'lockit/change-password-success.jade',// message that password has been changed successfully
    linkExpired: 'lockit/link-expired.jade',    // message that link has expired and maybe link to /'forgotPassword.route'
    sentEmail: 'lockit/post-forgot-password.jade'       // message that email with token has been sent
  }
};

// delete account settings
exports.deleteAccount = {
  route: '/delete-account',
  views: {
    remove: '',         // input fields 'name', 'phrase', 'password' | POST /'deleteAccount.route' | local variable 'error'
    removed: ''         // message that account has been deleted
  },
  handleResponse: true  // let lockit handle the response after delete account success
};

// lock account
// show warning after three failed login attempts
exports.failedLoginsWarning = 10;
// lock account after five failed login attempts
exports.failedLoginAttempts = 20;
// lock account for 20 minutes
exports.accountLockedTime = '20 minutes';

// public email address of your app
exports.emailFrom = 'welcome@console.gossim.io';

// email signup template
exports.emailSignup = {
  subject: 'Welcome to <%- appname %>',
  text: [
    '<h2>Hello <%- username %></h2>',
    'Welcome to <%- appname %>.',
    '<p><%- link %> to complete your registration.</p>'
  ].join(''),
  linkText: 'Click here'
};

// email already taken template
exports.emailSignupTaken = {
  subject: 'Email already registered',
  text: [
    '<h2>Hello <%- username %></h2>',
    'you or someone else tried to sign up for <%- appname %>.',
    '<p>Your email is already registered and you cannot sign up twice.',
    ' If you haven\'t tried to sign up, you can safely ignore this email. Everything is fine!</p>',
    '<p>The <%- appname %> Team</p>'
  ].join('')
};

// resend signup template
exports.emailResendVerification = {
  subject: 'Complete your registration',
  text: [
    '<h2>Hello <%- username %></h2>',
    'here is the link again. <%- link %> to complete your registration.',
    '<p>The <%- appname %> Team</p>'
  ].join(''),
  linkText: 'Click here'
};

// forgot password template
exports.emailForgotPassword = {
  subject: 'Reset your password',
  text: [
    '<h2>Hey <%- username %></h2>',
    '<%- link %> to reset your password.',
    '<p>The <%- appname %> Team</p>'
  ].join(''),
  linkText: 'Click here'
};