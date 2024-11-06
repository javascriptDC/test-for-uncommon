const sql = require('better-sqlite3');
const db = sql('database.db');

const dummyItems = [
  {
    name: 'Juicy Cheese Burger',
  },
  {
    name: 'Spicy Curry',
  },
  {
    name: 'Homemade Dumplings',
  },
];

db.prepare(`
   CREATE TABLE IF NOT EXISTS items (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL UNIQUE
    )
`).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO items VALUES (
         null,
         @name
      )
   `);

  for (const item of dummyItems) {
    stmt.run(item);
  }
}

initData();
