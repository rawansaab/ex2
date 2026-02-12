/**
 * Names: Rawan Saab: 213693625, Lareen Kadour: 213992431, George Hanna: 324090968
 * Github URL: https://github.com/rawansaab/ex2
 */


const express = require("express");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/profile", function (req, res) {
  const id = req.query.id;
  res.render("profile", { id: id });
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
