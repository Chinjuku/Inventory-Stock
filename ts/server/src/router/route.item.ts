import { Router } from "express";
import { getAllItems, getPaginateItems } from "../controllers/controller.item";

const router = Router();

router.get('/', getAllItems)

router.get('/paginate', getPaginateItems)

// router.get('/:item_id', getItemById);

export default router