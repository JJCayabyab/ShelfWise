import { create } from "zustand";
import axios from "axios";

// const url = "https://shelfwise-1.onrender.com";
const url = "https://shelfwise-1.onrender.com";

console.log(url);
export const useBookStore = create((set, get) => ({
  books: [],
  loading: false,
  error: null,

  //fetch all books
  fetchBooks: async () => {
    set({ loading: true });

    try {
      const res = await axios.get(`${url}/api/books`);
      set({ books: res.data.data, error: null });
    } catch (error) {
      if (error.response && error.response.status === 429) {
        set({ error: "Too many requests. Try again later." });
      } else {
        set({ error: error.message });
      }
    } finally {
      set({ loading: false });
    }
  },

  addBook: async (bookData) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${url}/api/books`, bookData);

      // add the new book to books
      set({ books: [...get().books, res.data.data] });
    } catch (error) {
      console.error("Error adding book:", error);
      throw error.response?.data?.message || error.message;
    } finally {
      set({ loading: false });
    }
  },

  updateBook: async (id, bookData) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`${url}/api/books/${id}`, bookData);

      // Update the specific book in the store
      set({
        books: get().books.map((book) =>
          book.id === id ? res.data.data : book
        ),
      });
    } catch (error) {
      console.error("Error updating a book:", error);
      throw error.response?.data?.message || error.message;
    } finally {
      set({ loading: false });
    }
  },

  deleteBook: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${url}/api/books/${id}`);
      set({
        books: get().books.filter((book) => book.id !== id),
      });
      return true;
    } catch (error) {
      console.error("Error deleting the book:", error);
      throw error.message;
    } finally {
      set({ loading: false });
    }
  },
}));
