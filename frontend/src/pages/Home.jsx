
import React, { useEffect } from "react";
import { useBookStore } from "../store/bookStore";
import { RefreshCwIcon } from "lucide-react";
import { useThemeStore } from "../store/themeSelector";
import BookCard from "../components/BookCard";

const Home = () => {
  const { books, loading, error, fetchBooks, deleteBook } = useBookStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) {
    return (
      <div role="status" className="flex justify-center mt-20">
        {/* spinner */}
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-8 md:px-12 md:py-14 lg:px-14 lg:py-18">
      <h1 className="w-1/2 mx-auto">
        ⚠️ This project is for **practice purposes only**. The site is deployed
        so everyone can freely add or delete items. Please don’t intentionally
        ruin or misuse it — it’s just for learning.
      </h1>

      <div className="flex items-center justify-center py-5 gap-5 w-full">
        <div className="w-2/3">
          <label className="input w-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
        </div>
        <div>
          <RefreshCwIcon onClick={fetchBooks} className="size-5" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <BookCard
            key={index}
            book={book}
            theme={theme}
            deleteBook={deleteBook}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

