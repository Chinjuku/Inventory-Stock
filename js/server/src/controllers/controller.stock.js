import mongoose, { Mongoose } from "mongoose";
import moment from 'moment-timezone';
import Stock from "../models/model.stock.js";
import { format, toZonedTime } from 'date-fns-tz';


const { ObjectId } = mongoose.Types

export const checkLot = async (req, res) => {
    const { item_id } = req.params;
    try {
        const countstock = await Stock.countDocuments({
            item_code: new ObjectId(String(item_id))
        })
        res.send({ count_lot: countstock });
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Error fetching items' });
    }
}

// const thaiTime = (datetime) => {
//     return new Date(moment(datetime).tz("Asia/Bangkok").format());
// }
// const thaiTime = (datetime) => {
//   const timeZone = 'Asia/Bangkok';
//   const zonedDate = toZonedTime(datetime, timeZone);
//   return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
// };

const thaiTime = (datetime) => {
    const date = new Date(datetime);
    date.setHours(date.getHours() + 7); // Thai time +7 hrs
    return date;
};
  

export const createStock = async (req, res) => {
    const { item_code, lot, amount, note, import_datetime, expire_datetime } = req.body;
    const import_thdatetime = thaiTime(import_datetime)
    const expire_thdatetime = thaiTime(expire_datetime)
    console.log(import_thdatetime)
    try {
        const newStock = await Stock.create({
            item_code: new ObjectId(String(item_code)),
            lot,
            amount,
            note,
            import_datetime: import_thdatetime,
            exp_datetime: expire_thdatetime,
        });

        const result = newStock.toObject();
        delete result.__v;
        console.log(newStock.created())
        console.log(newStock)
        res.status(201).send(result);
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: 'Error fetching items' });
    }
}