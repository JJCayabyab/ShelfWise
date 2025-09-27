import React, { useEffect } from "react";
import { useBookStore } from "../store/bookStore";

const Home = () => {
  const { books, loading, error, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks(); // ✅ call it once when component mounts
  }, [fetchBooks]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="mx-auto max-w-7xl px-6 py-10 
                    sm:px-8 sm:py-8
                    md:px-12 md:py-14
                    lg:px-13 lg:py-18"
    >
      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
};

export default Home;
