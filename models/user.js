let db = require("../db");
let ObjectID = require("mongodb").ObjectID;
let crypt = require("../crypt");

const collectionName = "user";

exports.add = async function(user, password) {
  const hashObj = crypt.genHash(password);
  const userObj = { user, ...hashObj };
  await db.get().collection(collectionName).insertOne(userObj);
  return userObj;
}

exports.deleteByUser = async function (user) {
  return db.get().collection(collectionName).deleteOne({user})
}


