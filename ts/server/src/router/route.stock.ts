import { Router } from "express";
import { checkLot, createStock } from "../controllers/controller.stock";

const router = Router();

router.get('/:item_id', checkLot);

router.post('/create', createStock)

export default router