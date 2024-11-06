const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// GET /items - Retrieve all items
app.get('/items', (req, res) => {
    db.getAllItems((err, items) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve items.' });
        }
        res.status(200).json(items);
    });
});

// POST /items - Add a new item
app.post('/items', (req, res) => {
    const { name, creator, creator_email } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Item name is required.' });
    }

    db.addItem(name, (err, newItem) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add item.' });
        }
        res.status(201).json(newItem);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
