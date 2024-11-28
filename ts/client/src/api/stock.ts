import axios from 'axios';
import { SubmitData } from '../types/stockform.type';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getCountLot = async (item_id: string) => {
    try {
        const getLot = await axios.get(`${BACKEND_URL}/api/stock/${item_id}`)
        return getLot.data.count_lot;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get item by id');
    }
}

export const createStock = async (formData: SubmitData) => {
    try {
        const createStock = await axios.post(`${BACKEND_URL}/api/stock/create`, formData)
        // console.log(createStock.status)
        return createStock.status;
    } catch (err) {
        return err;
    }
}