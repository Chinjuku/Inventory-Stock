import mongoose from 'mongoose';
import Item from '../models/model.item.js';

const { ObjectId } = mongoose.Types

export const getAllItems = async (req, res) => {
    try {
        // -> Your own query -> 
        // const items = await Item.where("name").equals("น้ำยา CBC").select("name")
        const items = await Item.find().lean() // **
        res.send(items);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching items' });
    }
}

export const getItemById = async (req, res) => {
    const { item_id } = req.params;

    if (!ObjectId.isValid(item_id)) {
        return res.status(400).send({ error: 'Invalid item ID format' });
    }

    try {
        const itemById = await Item.findById(item_id);
        if (!itemById) {
            return res.status(404).send({ error: 'Item not found' });
        }
        res.send(itemById);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).send({ error: 'Error fetching items' });
    }
}