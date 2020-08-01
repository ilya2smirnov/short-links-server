let db = require("../db");
let userModel = require("./users")

const collectionName = "shortLinks";

exports.add = async function (username, fullLink, shortLink) {
  let doc = userModel.findByUser(username);
  if (!doc) {
    throw [`User '${username}' not found`];
  }
  let objToInsert = {
    userId: doc._id,
    fullLink,
    shortLink
  }
  return db.get().collection(collectionName).insertOne(objToInsert)
    .then(doc => {
      return doc;
    }).catch(err => {
      console.log("DB Internal error", err);
      return "DB Internal error";
    })
}

exports.deleteByLinkId = async function (id) {
  return db.get().collection(collectionName).findOneAndDelete({
    _id: id
  }).then(doc => {
    if (doc) {
      return doc;
    } else {
      throw "Link not found";
    }
  }, err => {
    console.log("DB internal error:", err)
    return "DB internal error";
  })
}

exports.getAllByUserId = async function (userId) {
  return db.get().collection(collectionName).find({ userId }).toArray()
}
