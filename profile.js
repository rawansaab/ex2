/**
 * Names: Rawan Saab: 213693625, Lareen Kadour: , Geroge Hanna: .
 * Github URL: https://github.com/rawansaab/ex2
 */

const express = require("express");
const app = express();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./private/profiles.db");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/profile", function (req, res) {
  let id = req.query.id;

  db.get("SELECT * FROM animals WHERE id = ?", [id], function (err, animal) {
    if (err) {
        console.error(err);
        return;
    }
    res.render("profile", { id: id, animal: animal });
  });
});

app.listen(3000);