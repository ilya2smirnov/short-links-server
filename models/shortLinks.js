let db = require("../db");
let userModel = require("./users")
let ObjectID = require('mongodb').ObjectID;

const collectionName = "shortLinks";

exports.add = async function (username, fullLink, shortLink) {
  return userModel.findByUser(username)
    .then(doc => {
      let objToInsert = {
        userId: doc._id,
        fullLink,
        shortLink
      };
      return db.get().collection(collectionName).insertOne(objToInsert)
        .then(doc => {
        if (doc.insertedCount) {
          console.log("Inserted link", doc.ops[0]);
          return doc.ops[0];
        }
        else {
          console.log("DB Internal error", doc);
          throw "Internal error";
        }
        })
        .catch(err => {
          console.log("DB Internal error", err);
          return "DB Internal error";
        });
    });
}

exports.deleteByLinkId = async function (id, username) {
  if (!ObjectID.isValid(id)) {
    throw "Link id is not valid: " + id;
  }
  return userModel.findByUser(username)
    .then(userDoc => {
      return db.get().collection(collectionName).findOneAndDelete({_id: ObjectID(id), userId: userDoc._id})
        .then(doc => {
          if (doc.value) {
            console.log("Link deleted:", doc.value)
            return doc.value;
          } else {
            console.log("Link not found")
            throw "Link not found";
          }
        }, err => {
          console.log("DB internal error:", err)
          throw "DB internal error";
        });
    });
}

exports.getAllByUser = async function (username) {
  return userModel.findByUser(username)
    .then(doc => {
      return db.get().collection(collectionName).find({ userId: doc._id }).toArray();
    });
}
