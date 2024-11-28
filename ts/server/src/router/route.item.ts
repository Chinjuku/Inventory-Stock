import { Router } from "express";
import { getAllItems } from "../controllers/controller.item";

const router = Router();

router.get('/', getAllItems)

// router.get('/:item_id', getItemById);

export default router