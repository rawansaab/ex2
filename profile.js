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
    if (err) {
      res.status(500).send("Database error");
      return;
    }

    if (!animalRow) {
      res.status(404).send("Profile not found");
      return;
    }

    // animal_traits שולפים את התכונות מטבלת
    // [req.query.name] -במקום ב [id] -תוקן: משתמשים ב
    db.all("SELECT trait_name, trait_value FROM animal_traits WHERE animal_name = ?", [id], function (err, traitsRows) {
      if (err) {
        res.status(500).send("Database error");
        return;
      }

      // reviews החלק החדש - שולפים את הביקורות מטבלת
      // review במקום reviews :תוקן
      db.all("SELECT review_text, reviewer_name FROM reviews WHERE animal_name = ?", [id], function (err, reviewsRows) {
        // תוקן: בלוק הטיפול בשגיאות הושלם ונסגר כמו שצריך
        if (err) {
          res.status(500).send("Database error");
          return;
        }

        // מעבירים הכל יחד לתבנית, כולל הביקורות
        res.render("profile", { 
          id: id,
          animal: animalRow,
          traits: traitsRows,
          reviews: reviewsRows // תוקן: הוספנו את מערך הביקורות לתבנית
        });
      });
    });
  });
});

// הפעלת השרת והדפסת קישור לחיץ לבדיקה נוחה בדפדפן
app.listen(PORT, function () {
  console.log("Open: http://localhost:3000/profile?id=mickey");
});