import axios from 'axios';

export const getCountLot = async (item_id) => {
    try {
        const getLot = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/stock/${item_id}`)
        return getLot.data.count_lot;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get item by id');
    }
}