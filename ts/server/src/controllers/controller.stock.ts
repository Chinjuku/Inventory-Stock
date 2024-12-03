import mongoose from "mongoose";
import Stock from "../models/model.stock";
import { Request, Response } from "express";

const { ObjectId } = mongoose.Types

export const checkLot = async (req: Request, res: Response) => {
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

const thaiTime = (datetime: Date) => {
    const date = new Date(datetime)
    // date.setHours(date.getHours() + 7)
    return date
};
  

export const createStock = async (req: Request, res: Response) => {
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

        console.log(newStock)
        res.status(201).send(newStock);
    } catch (error) {
        // console.error(error.message)
        res.status(500).send({ error: 'Error fetching items' });
    }
}