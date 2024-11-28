import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    expire_in: {
        type: String,
        required: true
    },
    expire_in_type: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('Item', ItemSchema, 'item');
export default Item;