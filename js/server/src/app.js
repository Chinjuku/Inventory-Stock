import connectDB from './db.js';
import express from 'express';
import cors from 'cors';
import ItemRoutes from './router/route.item.js'
import StockRoutes from './router/route.stock.js';

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json())
connectDB();


app.use('/api/item', ItemRoutes)
app.use('/api/stock', StockRoutes)

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
