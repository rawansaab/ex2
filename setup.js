/**
 * Names: Rawan Saab: 213693625, Lareen Kadour: 213992431, George Hanna: 324090968
 * Github URL: https://github.com/rawansaab/ex2
 */

// Database setup script for myprofile
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database file path configuration
const dbPath = path.join(__dirname, "private", "profiles.db");
const db = new sqlite3.Database(dbPath);

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

// Step 4: Closing the database connection properly
db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Success! All required data has been added to profiles.db");
  }
});