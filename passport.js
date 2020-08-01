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
      userModel.verifyUser(username, password)
        .then(result => {
          console.log("Verified", result[0]);
          return done(null, result[0], {message: result[1]});
        }).catch(error => {
          return done(null, false, {message: error[1]})
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