import express from "express";
import {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  createBooks,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/multipleCreate", createBooks);  // for testing purpose only

export default router;
