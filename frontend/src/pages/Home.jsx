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
    <div>
      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
};

export default Home;
