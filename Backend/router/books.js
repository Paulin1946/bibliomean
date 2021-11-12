import express, { Router } from "express";
import books from "../controllers/books.js";
const router = express.Router()

//http://localhost:3004/api/books/deleteBooks
router.post("/registerBooks", books.registerBooks);
router.get("/listBooks", books.listBooks);
router.get("/findBooks/:_id", books.findBooks);
router.put("/updateBooks", books.updateBooks);
router.delete("/deleteBooks/:_id", books.deleteBooks);


export default router
