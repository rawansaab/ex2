/**
 * Names: Rawan Saab: 213693625, Lareen Kadour: 213992431, George Hanna: 324090968
 * Github URL: https://github.com/rawansaab/ex2
 */

const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/profile", function (req, res) {
  const id = req.query.id;
  res.render("profile", { id: id });
});

app.listen(port, function () {
  console.log("Open: http://localhost:3000/profile?id=mickey");
});