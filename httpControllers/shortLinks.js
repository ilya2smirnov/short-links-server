let shortLinksDb = require("../models/shortLinks");


exports.add = async function (req, res) {
  return shortLinksDb.add(req.body.user, req.body.fullLink, req.body.shortLink)
    .then(doc => {
      res.send(doc);
    }).catch(err => {
      console.log(err)
      res.status(400).send(err);
    })
}

exports.deleteByLinkId = async function (req, res) {
  return shortLinksDb.deleteByLinkId(req.body.linkId)
    .then(doc => {
      res.send(doc);
    }).catch(err => {
      console.log(err)
      res.status(400).send(err);
    })
}

exports.getAllByUser = async function (req, res) {
  return shortLinksDb.getAllByUser(req.body.user)
    .then(doc => {
      res.send(doc);
    }).catch(err => {
      console.log(err)
      res.status(400).send(err);
    })
}

