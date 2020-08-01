let userDb = require("../models/users")

exports.addUser = function (req, res) {
  return userDb.add(req.body.user, req.body.password)
    .then((result) => {
      res.send({"Added user" : result.doc});
    }).catch((error) => {
      res.send(error.err);
    })
}

exports.deleteUser = function (req, res) {
  return userDb.deleteByUser(req.body.user)
    .then((result) => {
      res.send({"Deleted user" : result.doc});
    }).catch((msg) => {
      res.send(msg);
    });
}

exports.getUser = function (req, res) {
  return userDb.findByUser(req.body.user)
    .then((doc) => {
      res.send({"Found user" : doc});
    }).catch((msg) => {
      res.send(msg);
    });
}


