import { create } from "zustand";
import axios from "axios";

// const url = "https://shelfwise-1.onrender.com";
const url = "http://localhost:5001";
// const url = "http:192.168.0.104:5001"

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
