import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  item_code: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  lot: { type: String, required: true },
  amount: { type: String, required: true },
  import_datetime: { type: Date, required: true },
  note: { type: String },
  exp_datetime: { type: Date, required: true }
});

const Stock = mongoose.model('Stock', StockSchema);

export default Stock;
