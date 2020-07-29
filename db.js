let MongoClient = require('mongodb').MongoClient;
let {dbName} = require('./settings')

let state = {
  db: null
}

exports.get = function (){
  return state.db;
}

exports.connect = async function(url) {
  if (state.db) {
    return;
  }
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      console.log("Successfully connected to DB");
      state.db = client(dbName);
    }).catch(err => {
      console.log("Unable to connect to DB:", err);
      throw err;
    });
}