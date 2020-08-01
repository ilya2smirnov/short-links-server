let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let userModel = require('./models/user')

exports.useLocalPassword = function () {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      userModel.verifyUser(username, password)
        .then(result => {
          return done(null, result[0]);
        }).catch(error => {
        return done(null, false, error[1])
      })
    }
  ));
}