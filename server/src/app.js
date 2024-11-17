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


app.get('/api/item', async (req, res) => {
  try {
    const items = await Item.find()
    res.send(items);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching items' });
  }
});

app.get('/api/stock/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const countstock = await Item.count({
      _id: id
    })
    res.send(countstock);
  } catch (error) {
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
