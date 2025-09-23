import express from "express";
import { getAllBooks } from "../controllers/bookController.js";
import { createBook } from "../controllers/bookController.js";
const router = express.Router();

//get all books
router.get("/", getAllBooks);
router.post("/", createBook);
//create a book

export default router;
