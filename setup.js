// Database setup script for myprofile
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database file path configuration
const dbPath = path.join(__dirname, "private", "profiles.db");
const db = new sqlite3.Database(dbPath);