/**
 * Names: Rawan Saab: 213693625, Lareen Kadour: 213992431, George Hanna: 324090968
 * Github URL: https://github.com/rawansaab/ex2
 */

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
    db.all("SELECT trait_name, trait_value FROM animal_traits WHERE animal_name = ?", [id], function (err, traitsRows) {
      if (err) {
        res.status(500).send("Database error");
        return;
      }

      // reviews שולפים את הביקורות מטבלת
      db.all("SELECT review_text, reviewer_name FROM reviews WHERE animal_name = ?", [id], function (err, reviewsRows) {
        if (err) {
          res.status(500).send("Database error");
          return;
        }

        // --- התוספת החדשהה ---
        db.all("SELECT animal_name FROM animal", [], function (err, friendsRows) {
          if (err) {
            console.error("Error fetching friends:", err.message);
          }

          res.render("profile", { 
            id: id,
            animal: animalRow,
            traits: traitsRows,
            reviews: reviewsRows,
            friends: friendsRows || [] // אם יש שגיאה נעביר מערך 
          });
        });
        
      });
    });
  });
});

// הפעלת השרת והדפסת קישור לחיץ לבדיקה נוחה בדפדפן
app.listen(PORT, function () {
  console.log("Open: http://localhost:3000/profile?id=mickey");
});