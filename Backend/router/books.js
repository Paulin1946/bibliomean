import express from "express";
import books from "../controllers/books.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

//http://localhost:3004/api/books/deleteBooks
router.post("/registerBooks", auth, books.registerBooks);
router.get("/listBooks", auth, books.listBooks);
router.get("/findBooks/:_id", auth, books.findBooks);
router.put("/updateBooks", auth, books.updateBooks);
router.delete("/deleteBooks/:_id", auth, books.deleteBooks);

export default router;
