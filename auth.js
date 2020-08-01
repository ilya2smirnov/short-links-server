let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let userModel = require('./models/user')

exports.useLocalPassword = function (app) {
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

  app.post('/user/get',
    passport.authenticate('local',
      {session: false, failureRedirect: '/user/get/fail', failureFlash: true}),
    function(req, res) {
      authController.getUser(req, res);
    });

  app.get('/user/get/fail', (req, res) => {
    res.send("User not found or password is incorrect");
  });
}