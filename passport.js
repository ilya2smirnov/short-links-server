let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let userModel = require('./models/users')

exports.useLocalPassword = function (app, urlList) {
  passport.use(new LocalStrategy(
    {
      usernameField: 'user',
      passwordField: 'password'
    },
    function (username, password, done) {
      return userModel.verifyUser(username, password)
        .then(result => {
          return done(null, result.doc);
        }).catch(error => {
          return done(null, false)
        })
    }
  ));

  let passwordOptions = {session: false, failureRedirect: '/api/user/get/fail'};
  for (let url of urlList) {
    app.post(url, passport.authenticate('local',passwordOptions));
  }

  app.get('/api/user/get/fail', (req, res) => {
    res.send("User not found or password is incorrect");
  });
}