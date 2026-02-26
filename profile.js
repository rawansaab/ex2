/**
 * Names: Rawan Saab: 213693625, Lareen Kadour: 213992431, George Hanna: 324090968
 * Github URL: https://github.com/rawansaab/ex2
 */

const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose(); 
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const db = new sqlite3.Database("private/profiles.db");

app.get("/profile", function (req, res) {
  const id = req.params.id; 
  res.render("profile", { id: id });
});

app.listen(PORT, function () {
  console.log("Server is running on port 3000");
});