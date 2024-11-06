import React, { useState } from 'react';
import { addItem } from './api';

function ItemForm({ onAdd }) {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Item name cannot be empty.');
            return;
        }
        try {
            const newItem = await addItem(name);
            onAdd(newItem);
            setName('');
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name"
            />
            <button type="submit">Add Item</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default ItemForm;
