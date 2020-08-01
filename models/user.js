let db = require("../db");
let crypt = require("../crypt");

const collectionName = "user";

exports.findByUser = async function(user) {
  let doc = await db.get().collection(collectionName).findOne({ user });
  if (doc) {
    console.log("Found doc:", doc);
  } else {
    console.log("User", user, "not found");
  }
  return doc;
}

exports.verifyUser = async function(user, password) {
  let doc = await db.get().collection(collectionName).findOne({ user });
  if (doc) {
    let hashObj = crypt.genHash(doc.password, doc.salt);
    if (hashObj.hash === doc.hash) {
      console.log("User:", user, "verified");
      return doc;
    }
  }
  console.log("User:", user, "isn't verified");
  return null;
}

exports.add = async function(user, password) {
  let doc = await exports.findByUser(user);
  if (doc) {
    throw "User already exists";
  }
  const hashObj = await crypt.genHash(password);
  const userObj = { user, ...hashObj };
  await db.get().collection(collectionName).insertOne(userObj);
  console.log("Add user:", userObj);
  return userObj;
}

exports.deleteByUser = async function(user) {
  let doc = await exports.findByUser(user);
  if (doc) {
    let result = await db.get().collection(collectionName).deleteOne({user});
    if (result.result.n === 1 && result.result.ok === 1) {
      console.log("Deleted record:", doc);
      return doc;
    } else {
      console.log("Internal error:", result);
      throw "Internal error";
    }
  } else {
    console.log("User", user, "doesn't exist");
    throw "User '" + user + "' doesn't exist";
  }
}





