let db = require("../db");
let userModel = require("./user")

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
      return ["", doc];
    }).catch(err => {
      console.log("DB Internal error", err);
      return ["DB Internal error"];
    })
}