
import express from "express";
import supplier from "../controllers/supplier.js";
const router = express.Router()

//http://localhost:3004/api/supplier/updateSupplier
router.post("/registerSupplier", supplier.registerSupplier);
router.get("/listSupplier", supplier.listSupplier);
router.get("/findSupplier/:_id", supplier.findSupplier);
router.put("/updateSupplier", supplier.updateSupplier);
router.delete("/deleteSupplier/:_id", supplier.deleteSupplier);



export default router