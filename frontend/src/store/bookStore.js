import { create } from "zustand";
import axios from "axios";
const url = "http://localhost:5001";

//for  fetching all books
export const useBookStore = create((set, get) => ({
  books: [],
  loading: false,
  error: null,
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
}));
