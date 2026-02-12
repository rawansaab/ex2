/**
 * Names: Rawan Saab: 213693625, Lareen Kadour: 213992431, George Hanna: 324090968
 * Github URL: https://github.com/rawansaab/ex2
 */
 
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

const db = new sqlite3.Database("./private/profiles.db");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/profile", function (req, res) {
  const id = req.query.id;

  db.get("SELECT * FROM animals WHERE id = ?", [id], function (err, animal) {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
      return;
    }
    res.render("profile", { id: id, animal: animal });
  });
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});