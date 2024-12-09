import mongoose from 'mongoose';
import Item, { ItemType } from '../models/model.item';
import { Request, Response } from "express";
import { StockType } from '../models/model.stock';

const { ObjectId } = mongoose.Types

export const getAllItems = async (req: Request, res: Response) => {
    try {
        // -> Your own query -> 
        // const items = await Item.where("name").equals("น้ำยา CBC").select("name")
        const items = await Item.find().lean<ItemType[]>() // ** เพิ่ม lean make more performance
        res.send(items);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching items' });
    }
}

export const getPaginateItems = async (req: Request, res: Response) => {
    try {
      let { page, limit } = req.query;
      const { search, type } = req.query;
      const pageNumber = parseInt(String(page || "1"));
      const limitNumber = parseInt(String(limit || "10"));
      const skipPage = (pageNumber - 1) * limitNumber
      const searchRegex = '.*' + search + '.*'
      let query: {} = {};
      if (type === "all") {
        query = {
          $or: [
            { _id: ObjectId.isValid(String(search)) ? new ObjectId(String(search)) : undefined },
            { name: { $regex: searchRegex } },
            { expire_in_type: { $regex: searchRegex } },
            { expire_in: Number(search) },
          ]
        };
      } else if (type === "name") {
        query = { name: { $regex: searchRegex } };
      }
      const items = await Item.find(query)
        .skip(skipPage)
        .limit(limitNumber)
        .lean<ItemType[]>();
      const totalItems = await Item.countDocuments();
      console.log(items, items.length, pageNumber)
      console.log(search)
      res.json({
        data: items,
        total: totalItems,
        page: pageNumber,
        limit: limitNumber,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
};


// export const getItemById = async (req: Request, res: Response) => {
//     const { item_id } = req.params;

//     if (!ObjectId.isValid(item_id)) {
//         return res.status(400).send({ error: 'Invalid item ID format' });
//     }

//     try {
//         const itemById = await Item.findById(item_id);
//         if (!itemById) {
//             return res.status(404).send({ error: 'Item not found' });
//         }
//         res.send(itemById);
//     } catch (error) {
//         console.error('Error fetching item:', error);
//         res.status(500).send({ error: 'Error fetching items' });
//     }
// }