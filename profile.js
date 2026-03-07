/**
 * Names: Rawan Saab: 213693625, Lareen Kadour: 213992431, George Hanna: 324090968
 * Github URL: https://github.com/rawansaab/ex2
 */

const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = 3000;

// הגדרת תיקיית הקבצים הסטטיים והתבניות
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const dbPath = path.join(__dirname, "private", "profiles.db");
const db = new sqlite3.Database(dbPath);

// לוגיקת אתחול נתונים
db.serialize(function() {
  // Step 1: Adding the main profile description (Fix: using OR REPLACE to allow updates)
  db.run(`INSERT OR REPLACE INTO animals (animal_name, description) VALUES ('myprofile', 'We are Rawan Saab, Lareen Kadour, and George Hanna. Information Systems students at Zefat Academic College, creating this dynamic profile for assignment 2.')`);

  // Step 2: Adding 4 personal traits for the team
  db.run(`INSERT OR REPLACE INTO animal_traits (animal_name, trait_name, trait_value) VALUES 
  ('myprofile', 'Names', 'Rawan, Lareen & George'),
  ('myprofile', 'Academic Year', '2026'),
  ('myprofile', 'Specialization', 'Information Systems'),
  ('myprofile', 'Tech Stack', 'Node.js, Express, SQLite')`);

// Step 3: Adding 4 reviews with the correct 'reviewer' column
  db.run(`INSERT OR REPLACE INTO reviews (animal_name, review_number, review_text, reviewer) VALUES 
  ('myprofile', 1, 'Lareen’s technical proficiency and dedication to the front-end design made her a vital asset to our team.', 'Rawan Saab'),
  ('myprofile', 2, 'George’s backend development skills and problem-solving abilities were crucial in building our profile’s functionality.', 'Lareen Kadour'),
  ('myprofile', 3, 'Rawan’s leadership and organizational skills kept our project on track. She bridges technical requirements perfectly.', 'George Hanna'),
  ('myprofile', 4, 'If Full-Stack development was a blockbuster movie, Dr. Boaz Miller would be our Oscar-winning director! We have officially leveled up from "Syntax Errors" to "Code Warriors" thanks to this inspiring course. We are aiming for a grade that matches our passion—a perfect 100—and we are already lining up for the sequel!', 'The Code Warriors (Rawan, Lareen & George)')`);
});

app.get("/profile", function (req, res) {
  const id = req.query.id || "myprofile";

  // שליפת מידע על הפרופיל
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

    // שליפת תכונות
    db.all("SELECT trait_name, trait_value FROM animal_traits WHERE animal_name = ?", [id], function (err, traitsRows) {
      if (err) {
        console.error("Error in animal_traits table:", err.message); 
        res.status(500).send("Database error");
        return;
      }

      // שליפת ביקורות
      db.all("SELECT review_text, reviewer FROM reviews WHERE animal_name = ?", [id], function (err, reviewsRows) {
        if (err) {
          console.error("Error in reviews table:", err.message); 
          res.status(500).send("Database error");
          return;
        }

        // שליפת שאר החברים 
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
            friends: friendsRows 
          });
        });
      });
    });
  });
});

app.listen(PORT, function () {
  console.log("Server is running!");
  console.log("Check our profile here: http://localhost:3000/profile?id=myprofile");
  console.log("Check Mickey's profile here: http://localhost:3000/profile?id=mickey");
});