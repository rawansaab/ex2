// Database setup script for myprofile
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database file path configuration
const dbPath = path.join(__dirname, "private", "profiles.db");
const db = new sqlite3.Database(dbPath);

// Step 1: Adding the main profile description directly
db.run(`INSERT INTO animals (animal_name, description) VALUES ('myprofile', 'We are Rawan Saab, Lareen Kadour, and George Hanna. Information Systems students at Zefat College, showcasing our team profile.')`);

// Step 2: Adding 4 personal traits for the team
db.run(`INSERT INTO animal_traits (animal_name, trait_name, trait_value) VALUES 
('myprofile', 'Names', 'Rawan, Lareen & George'),
('myprofile', 'Academic Year', '2026'),
('myprofile', 'Specialization', 'Information Systems'),
('myprofile', 'Tech Stack', 'Node.js, Express, SQLite')`);

// Step 3: Adding  personal reviews
db.run(`INSERT INTO reviews (animal_name, review_number, review_text, reviewer) VALUES 
('myprofile', 1, 'The team demonstrated great collaboration skills.', 'Senior Developer'),
('myprofile', 2, 'The dynamic features are implemented perfectly.', 'Project Lead')`);