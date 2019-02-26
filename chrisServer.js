const express = require("express");
const bodyParser = require("body-parser");

const connect = require("./connectServer");

const app = express();

const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let db;

app.get("/players", (req, res, next) => {
  let myData = db.collection("myData");

  myData.find({}).toArray((err, players) => {
    if (err) {
      return res.status(500).json({ error: err, message: "Unlucky" });
    }

    players.forEach(function(doc) {
      console.log(doc);
    });
    res.json({
      payload: players
    });
  });
});

app.get("/players/:id", (req, res, next) => {
  const { id } = req.params;
  let myData = db.collection("myData");

  myData.find({ id: Number(id) }).toArray((err, players) => {
    if (err) {
      return res.status(500).json({ error: err, message: "Unlucky" });
    }

    console.log(players);
    res.json({
      payload: players[0]
    });
  });
});

app.post("/players", (req, res, next) => {
  let myData = db.collection("myData");
  if (typeof req.body.first_name !== "string") {
    return res.status(422).json({ error: "No name" });
  }
  const { first_name, last_name, email } = req.body;
  const data = {
    first_name,
    last_name,
    email,
    id: getId(),
    score: 0
  };
  myData.insert(data, (err, result) => {
    if (err) throw err;

    res.status(201).json({ payload: result.ops[0] });
  });
});

connect("test").then(database => {
  db = database;
  app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
});
