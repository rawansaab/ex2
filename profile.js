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

  db.get("SELECT animal_name, description FROM animals WHERE animal_name = ?", [id], function (err, animalRow) {
    if (err) {
      console.error("Error in animals table:", err.message); 
      res.status(500).send("Database error");
      return;
    }

    if (!animalRow) {
      res.status(404).send("Profile not found");
      return;
    }

    db.all("SELECT trait_name, trait_value FROM animal_traits WHERE animal_name = ?", [id], function (err, traitsRows) {
      if (err) {
        console.error("Error in animal_traits table:", err.message); 
        res.status(500).send("Database error");
        return;
      }

      db.all("SELECT review_text, reviewer_name FROM reviews WHERE animal_name = ?", [id], function (err, reviewsRows) {
        if (err) {
          console.error("Error in reviews table:", err.message); 
          res.status(500).send("Database error");
          return;
        }

        // תיקון סופי: שולפים את שאר החברים (לא כולל החיה שמוצגת כרגע)
        db.all("SELECT animal_name FROM animals WHERE animal_name != ?", [id], function (err, friendsRows) {
          if (err) {
            console.error("Error fetching friends:", err.message);
            res.status(500).send("Database error");
            return;
          }

          res.render("profile", { 
            id: id,
            animal: animalRow,
            traits: traitsRows,
            reviews: reviewsRows,
            friends: friendsRows // מעבירים את רשימת החברים האמיתית
          });
        });
        
      });
    });
  });
});

app.listen(PORT, function () {
  console.log("Open: http://localhost:3000/profile?id=mickey");
});