import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getItems = async () => {
    try {
        const items = await axios.get(`${BACKEND_URL}/api/item`)
        return items.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get items');
    }
}

export const getQueryItems = async (page: number, pageSize: number, searchData: string, type: string) => {
    try {
        const query = await axios.get(
            `${BACKEND_URL}/api/item/paginate?page=${page}&limit=${pageSize}&search=${searchData}&type=${type}`
        )
        return query.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get query items');
    }
    
}

// export const getItembyId = async (item_id: string) => {
//     try {
//         const item = await axios.get(`${BACKEND_URL}/api/item/${item_id}`)
//         return item.data;
//     } catch (err) {
//         console.error(err);
//         throw new Error('Failed to get item by id');
//     }
// }