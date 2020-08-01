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
      // if (password === "ilya1_pass")
      //   return done(null, "ok");
      // else
      //   return done(null, false);
      userModel.verifyUser(username, password)
        .then(result => {
          console.log("Verified", result[0]);
          return done(null, result[0]);
        }).catch(error => {
          return done(null, false, error[1])
        })
    }
  ));
}