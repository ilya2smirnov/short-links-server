let db = require("../db");
let crypt = require("../crypt");

const collectionName = "user";

exports.findByUser = async function(user) {
  let doc;
  try {
    doc = await db.get().collection(collectionName).findOne({user});
  } catch (err) {
    console.log("DB error:", err);
    throw "Internal error";
  }
  if (doc) {
    console.log("User found:", doc);
    return doc;
  } else {
    console.log("User", user, "not found");
    throw "User " + user + " found";
  }
}

exports.verifyUser = async function(user, password) {
  let doc;
  try {
    doc = await exports.findByUser(user);
  } catch (err) {
    throw err;
  }
  if (doc) {
    let hashObj = await crypt.genHash(password, doc.salt);
    if (hashObj.hash === doc.hash) {
      console.log("User", user, "is authenticated");
      return doc;
    } else {
      console.log("User:", user, "is not authenticated");
      throw "Incorrect password";
    }
  }
  console.log("User:", user, "is not authenticated");
  throw "Username not found";
}

exports.add = async function(user, password) {
  let doc;
  try {
    doc = await exports.findByUser(user);
  } catch (err) { }
  if (doc) {
    console.log("User", user, "already exists");
    throw "User " + user + " exists";
  }
  const hashObj = await crypt.genHash(password);
  const userObj = { user, ...hashObj };
  try {
    await db.get().collection(collectionName).insertOne(userObj);
  } catch (err) {
    console.log("DB internal error", err);
    throw "Internal error";
  }
  console.log("Added user:", userObj);
  return "User added";
}

exports.deleteByUser = async function(user) {
  let doc;
  try {
    doc = await exports.findByUser(user);
  } catch (err) {
    console.log("User", user, "doesn't exist");
    throw "User '" + user + "' doesn't exist";
  }
  console.log(doc);
  let result = await db.get().collection(collectionName).deleteOne({user});
  if (result.result.n === 1 && result.result.ok === 1) {
    console.log("User deleted:", doc);
    return "User deleted";
  } else {
    console.log("Internal error:", result);
    throw "Internal error";
  }
}





