const mongodb = require("mongodb");

function connect(database) {
  return mongodb.MongoClient.connect(
    "mongodb+srv://appservice:appservice@cluster0-iba3x.mongodb.net/test"
  ).then(client => {
    console.log("connected to MongoDB");
    return client.db(database);
  });
}
module.exports = connect;
