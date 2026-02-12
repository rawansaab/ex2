/**
 * Names: Rawan Saab: 213693625, Lareen Kadour: , Geroge Hanna: .
 * Github URL: https://github.com/rawansaab/ex2
 */

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/profile", function (req, res) {
  let id = req.query.id;
  res.render("profile", { id: id });
});

app.listen(3000);