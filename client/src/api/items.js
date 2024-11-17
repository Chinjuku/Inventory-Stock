import axios from 'axios';

export const getItems = async () => {
    try {
        const items = await axios.get('http://localhost:3000/api/item')
        return items.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get items');
    }
    
}