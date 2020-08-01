let userDb = require("../models/users")

exports.addUser = function (req, res) {
  return userDb.add(req.body.user, req.body.password)
    .then((msg) => {
      res.send(msg);
    }).catch((msg) => {
      res.send(msg);
    })
}

exports.deleteUser = function (req, res) {
  return userDb.deleteByUser(req.body.user)
    .then((msg) => {
      res.send(msg);
    }).catch((msg) => {
      res.send(msg);
    });
}

exports.getUser = function (req, res) {
  return userDb.findByUser(req.body.user)
    .then((doc) => {
      res.send(doc);
    }).catch((msg) => {
      res.send(msg);
    });
}


