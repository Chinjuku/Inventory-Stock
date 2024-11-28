import { Router } from "express";
import { getAllItems, getItemById } from "../controllers/controller.item.js";

const router = Router();

router.get('/', getAllItems)

router.get('/:item_id', getItemById);

export default router