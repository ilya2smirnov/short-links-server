let userDb = require("../models/user")

exports.addUser = function (req, res) {
  userDb.add(req.body.user, req.body.password)
    .then(result => {
      res.send(result);
    }).catch(error => {
      res.send(error);
    })
}

exports.deleteUser = function (req, res) {
  userDb.deleteByUser(req.body.user)
    .then(result => {
      res.send(result.result);
    }).catch(error => {
      res.send(error);
    });
}


