import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }, // e.g., "น้ำยาตรวจ CBC"
  expire_in: { type: String, required: true }, // e.g., "30"
  expire_in_type: { type: String, required: true } // e.g., "day"
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
