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

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
