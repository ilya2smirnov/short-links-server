let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let userModel = require('./models/user')

passport.use(new LocalStrategy(
  function(username, password, done) {
    let doc = userModel.verifyUser(username, password);
    if (doc) {
      return done(null, doc);
    }
    return done(null, false, "Incorrect credentials");
  }
));