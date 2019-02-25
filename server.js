const express = require("express");
const connect = require("./connectServer");

const app = express();

const PORT = 3100;

let db;

app.get("/", (req, res, next) => {
  let myCollection = db.collection("myData");

  myCollection.find({}).toArray(function(err, docs) {
    if (err) throw err;

    docs.forEach(function(docs) {
      console.log(docs);
    });
    res.json({ result: docs });
  });
});

app.post("/", (req, res, next) => {
  let myCollection = db.collection("myData");

  myCollection.insert(
    {
      id: 1,
      first_name: "Olivia",
      last_name: "Winteringham",
      email: "ow@internet.com",
      score: "1"
    },
    (err, result) => {
      if (err) throw err;

      res.json({ result });
    }
  );
});

app.patch("/:score", (req, res, next) => {
  myCollection.update("score");
  (err, result) => {
    if (err) throw err;
  };
});

connect("test").then(database => {
  db = database;
  app.listen(PORT, () => console.log("Listening!!"));
});

//Make a server which connects to our online DB, and allows users to interact with the data
//They should be able to:
//Create a new item and write it to the file
//Update an item in the file
//Delete an item in the file
// IF YOU GET STUCK, GET CREATIVE! There isn't 1 right way to solve this, so try things out
// try and build this in a restful way. Get Users should return all userSelect:

//let addNewFile = db.collection("addNewFile");
// Note that the insert method can take either an array or a dict.

//addNewFile.insert(id, function (err, result) {

//if (err) throw err;
