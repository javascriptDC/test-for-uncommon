import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import ItemForm from './ItemForm';
import { fetchItems } from './api';

function App() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await fetchItems();
                setItems(data);
                setError(null);
            } catch (err) {
                setError('Failed to load items.');
            }
        };
        loadItems();
    }, []);

    const handleAddItem = (item) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    return (
        <div>
            <h1>Item List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ItemList items={items} />
            <h2>Add New Item</h2>
            <ItemForm onAdd={handleAddItem} />
        </div>
    );
}

export default App;
