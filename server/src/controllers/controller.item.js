import mongoose from 'mongoose';

const Item = mongoose.model('Item',
    new mongoose.Schema({}, { strict: false }),
    'item');

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find().lean() // **
        res.send(items);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching items' });
    }
}

export const getItemById = async (req, res) => {
    const { item_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(item_id)) {
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