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

const dbPath = path.join(__dirname, "private", "profiles.db");
const db = new sqlite3.Database(dbPath);

app.get("/profile", function (req, res) {
  const id = req.query.id; 

    // animals שולפים את הנתונים מטבלת 
  db.get("SELECT animal_name, description FROM animals WHERE animal_name = ?", [id], function (err, animalRow) {
    // הוספת טיפול בשגיאות למקרה שהשאילתה נכשלת
    if (err) {
      res.status(500).send("Database error");
      return;
    }

    // אם לא נמצאה חיה כזו
    if (!animalRow) {
      res.status(404).send("Profile not found");
      return;
    }

    res.render("profile", { 
      id: id,
      animal: animalRow
    });
  });
});

app.listen(PORT, function () {
  console.log("Server is running on port 3000");
});