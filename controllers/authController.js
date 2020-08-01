let userDb = require("../models/user")

exports.addUser = function (req, res) {
  userDb.add(req.body.user, req.body.password)
    .then(([doc, msg]) => {
      res.send(msg);
    }).catch(([doc, msg]) => {
      res.send(msg);
    })
}

exports.deleteUser = function (req, res) {
  userDb.deleteByUser(req.body.user)
    .then(([n, doc, msg]) => {
      res.send(msg);
    }).catch(([n, doc, msg]) => {
      res.send(msg);
    });
}


