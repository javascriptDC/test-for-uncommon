const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (it will be created if it doesn't exist)
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create the items table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);
});

// Function to get all items
function getAllItems(callback) {
    db.all('SELECT * FROM items', (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

// Function to add a new item
function addItem(name, callback) {
    const stmt = db.prepare('INSERT INTO items (name) VALUES (?)');
    stmt.run(name, function (err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { id: this.lastID, name });
        }
    });
    stmt.finalize();
}

module.exports = { getAllItems, addItem };
