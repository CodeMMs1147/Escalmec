import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import upload from "../middlewares/upload.js"
import {
  getProducts,
  createProduct,
  createCustomers,
  getTransactions,
  getFacturas,
  getGeography,
  getClients,
} from "../controllers/client.js";

const router = express.Router();

router.get("/productos", getProducts);

router.post("/productos", upload.single('image'), createProduct);

router.use("/uploads", express.static("uploads"));

router.get("/clientes", getClients);

router.post("/clientes", createCustomers);
// router.get("/transactions", getTransactions);
router.get("/facturas", getFacturas);
// router.get("/geography", getGeography);

export default router;
