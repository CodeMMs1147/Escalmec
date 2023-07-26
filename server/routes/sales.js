import express from "express";
import { getSales, createSale } from "../controllers/sales.js";

const router = express.Router();

router.get("/sales", getSales);
router.post("/sales", createSale);

export default router;
