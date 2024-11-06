import axios from 'axios';

const API_URL = 'http://localhost:5000/items';

export const fetchItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch items.');
    }
};

export const addItem = async (name) => {
    try {
        const response = await axios.post(API_URL, { name });
        return response.data;
    } catch (error) {
        throw new Error('Failed to add item.');
    }
};
