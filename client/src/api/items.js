import axios from 'axios';

export const getItems = async () => {
    try {
        const items = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/item`)
        return items.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get items');
    }
}

export const getItembyId = async (item_id) => {
    try {
        const item = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/item/${item_id}`)
        return item.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get item by id');
    }
}