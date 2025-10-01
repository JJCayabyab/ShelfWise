import React, { useEffect } from "react";
import { useBookStore } from "../store/bookStore";
import { RefreshCwIcon } from "lucide-react";
import { useThemeStore } from "../store/themeSelector";
import BookCard from "../components/BookCard";
import { useState } from "react";
const Home = () => {
  const { books, loading, error, fetchBooks, deleteBook } = useBookStore();
  const { theme } = useThemeStore();
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);


  if (loading) {
    return (
      <div role="status" className="flex justify-center mt-20">
        {/* spinner component here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center mt-20 text-red-500">
        Error: {error}
      </div>
    );
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-8 md:px-12 md:py-14 lg:px-14 lg:py-18">
      <h1 className="w-full lg:w-1/2 mx-auto">
        ⚠️ This project is for **practice purposes only**. The site is deployed
        so everyone can freely add or delete items. Please don’t intentionally
        ruin or misuse it.
      </h1>

      {/*search */}
      <div className="flex items-center justify-center py-5 gap-5 w-full">
        <div className="w-2/3">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="4"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a book"
            />
          </label>
        </div>
        <div>
          <RefreshCwIcon onClick={fetchBooks} className="size-5" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book, index) => (
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
