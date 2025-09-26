import { sql } from "../config/db.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await sql`SELECT * FROM books
    ORDER BY created_at DESC`;

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.log("Error in fetching books:", error);
    res.status(500).json({ success: "false", message: "Server Error" });
  }
};

export const getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await sql`SELECT * FROM books 
    WHERE id = ${id}
    `;

    if (book.length === 0) {
      return res
        .status(404)
        .json({ success: "false", message: "Book not found" });
    }

    res.status(200).json({ success: "true", data: book[0] });
  } catch (error) {
    console.log("Error in fetching a book:", error);
    res.status(500).json({ success: "false", message: "Server Error" });
  }

  res.send("Update a book by ID");
};

export const createBook = async (req, res) => {
  const { title, author, year_published, img } = req.body;

  if (!title || !author || !year_published) {
    return res
      .status(400)
      .json({ success: "false", message: "All fields are required" });
  }

  try {
    const newBook = await sql`
     INSERT INTO books(title, author, year_published,img) 
     VALUES (${title}, ${author}, ${year_published}, ${img})
     RETURNING *
     `;
    console.log(newBook);
    res.status(201).json({ success: "true", data: newBook[0] });
  } catch (error) {
    console.log("Error in creating a book:", error);
    res.status(500).json({ success: "false", message: "Server Error" });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, year_published, img } = req.body;

  try {
    const updatedBook = await sql`
      UPDATE books
      SET title = ${title},author = ${author},year_published = ${year_published},img = ${img}
      WHERE id = ${id}
      RETURNING *
    `;

    if (updatedBook.length === 0) {
      return res
        .status(404)
        .json({ success: "false", message: "Book not found" });
    }

    res.status(200).json({ success: "true", data: updatedBook[0] });
  } catch (error) {
    console.log("Error in updating a book:", error);
    res.status(500).json({ success: "false", message: "Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBook = await sql`
      DELETE FROM books 
      WHERE id = ${id}    
      RETURNING *
    `;

    if (deleteBook.length === 0) {
      return res.status(404).json({
        success: "false",
        message: "Book not found. Failed in deleting book.",
      });
    }

    res
      .status(200)
      .json({ success: "true", message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error in deleting a book:", error);
    res.status(500).json({ success: "false", message: "Server Error" });
  }
};
