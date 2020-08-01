let MongoClient = require('mongodb').MongoClient;

const dbName = 'short_links_server';

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
      state.db = client.db(dbName);
    }).catch(err => {
      console.log("Unable to connect to DB:", err);
      throw err;
    });
}