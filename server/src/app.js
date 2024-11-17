import connectDB from './db.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const port = 3000;
const app = express();

app.use(cors());
connectDB();

const Item = mongoose.model('Item',
  new mongoose.Schema({}, { strict: false }),
  'item');
const Stock = mongoose.model('Stock',
  new mongoose.Schema({}, { strict: false }),
  'stock');


app.get('/api/item', async (req, res) => {
  try {
    const items = await Item.find()
    res.send(items);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching items' });
  }
});

app.get('/api/item/:item_id', async (req, res) => {
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
});

app.get('/api/stock/:item_id', async (req, res) => {
  const { item_id } = req.params;
  try {
    const countstock = await Stock.countDocuments({
      item_code: new mongoose.Types.ObjectId(item_id)
    })
    if (!countstock) {
      return res.send({ count_lot: countstock })
    }
    res.send({ count_lot: countstock });
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Error fetching items' });
  }
});

app.get('/api/hello2', (req, res) => {
  res.send('Hello, World2!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
