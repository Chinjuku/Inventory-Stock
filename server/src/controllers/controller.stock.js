import mongoose from "mongoose";
import moment from 'moment-timezone';

const Stock = mongoose.model('Stock',
    new mongoose.Schema({}, { strict: false  }, { versionKey: false }),
    'stock');

export const checkLot = async (req, res) => {
    const { item_id } = req.params;
    try {
        const countstock = await Stock.countDocuments({
            item_code: new mongoose.Types.ObjectId(item_id)
        })
        res.send({ count_lot: countstock });
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Error fetching items' });
    }
}

const thaiTime = (datetime) => {
    return new Date(moment.utc(datetime).tz('Asia/Bangkok')); // * Edit time
}

export const createStock = async (req, res) => {
    const { item_code, lot, amount, note, import_datetime, expire_datetime } = req.body;
    const import_thdatetime = thaiTime(import_datetime)
    const expire_thdatetime = thaiTime(expire_datetime)
    try {
        const newStock = await Stock.create({
            item_code: new mongoose.Types.ObjectId(item_code),
            lot,
            amount,
            note,
            import_datetime: import_thdatetime,
            exp_datetime: expire_thdatetime,
        });

        const result = newStock.toObject();
        delete result.__v;
        res.status(201).send(result);
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Error fetching items' });
    }
}