let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let userModel = require('./models/user')

exports.useLocalPassword = function () {
  passport.use(new LocalStrategy(
    {
      usernameField: 'user',
      passwordField: 'password'
    },
    function (username, password, done) {
      userModel.verifyUser(username, password)
        .then(result => {
          console.log("Verified", result[0]);
          return done(null, result[0], {message: result[1]});
        }).catch(error => {
          return done(null, false, {message: error[1]})
        })
    }
  ));
}