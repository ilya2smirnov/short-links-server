let db = require("../db");
let crypt = require("../crypt");

const collectionName = "user";

exports.findByUser = async function(user) {
  let doc = await db.get().collection(collectionName).findOne({ user });
  if (doc) {
    console.log("Found doc:", doc);
    return [doc, "User found"];
  } else {
    console.log("User", user, "not found 3");
    throw [doc, "User not found"];
  }
}

exports.verifyUser = async function(user, password) {
  let doc, msg;
  try {
    [doc, msg] = await exports.findByUser(user);
  } catch (err) {
    console.log("User", user, "doesn't exist");
    throw [null, "User '" + user + "' doesn't exist"];
  }
  if (doc) {
    let hashObj = await crypt.genHash(password, doc.salt);
    console.log("result_hash:", hashObj.hash);
    console.log("db_hash:", doc.hash);
    if (hashObj.hash === doc.hash) {
      console.log("User:", user, "verified");
      return [doc, "User verified"];
    } else {
      console.log("User:", user, "isn't verified");
      throw [doc, "Incorrect password"];
    }
  }
  console.log("User:", user, "isn't verified");
  throw [null, "Username not found"];
}

exports.add = async function(user, password) {
  let doc, msg;
  try {
    [doc, msg] = await exports.findByUser(user);
  } catch (err) {

  }
  if (doc) {
    console.log("User:", user, "already exists");
    throw [doc, "User already exists"];
  }
  const hashObj = await crypt.genHash(password);
  const userObj = { user, ...hashObj };
  await db.get().collection(collectionName).insertOne(userObj);
  console.log("Add user:", userObj);
  return [userObj, "User added"];
}

exports.deleteByUser = async function(user) {
  let doc, msg;
  try {
    [doc, msg] = await exports.findByUser(user);
  } catch (err) {
    console.log("User", user, "doesn't exist");
    throw [0, null, "User '" + user + "' doesn't exist"];
  }
  console.log(doc, msg);
  let result = await db.get().collection(collectionName).deleteOne({user});
  if (result.result.n === 1 && result.result.ok === 1) {
    console.log("Deleted record:", doc);
    return [result.result.n, doc, "Record deleted"];
  } else {
    console.log("Internal error:", result);
    throw [result.result.n, null, "Internal error"];
  }
}




