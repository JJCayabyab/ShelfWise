import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore"; 
import { Link } from "react-router-dom";
const BookPage = () => {
  const { id } = useParams();
  const { books } = useBookStore();

  // If books are already in store (fetched at home)
  const book = books.find((b) => String(b.id) === id);

  if (!book) return <p className="p-4">Book not found.</p>;
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-8 md:px-12 md:py-14 lg:px-14 lg:py-18">
        <Link to={"/"}> <h1>{"<--"} </h1> </Link>
        <div className="flex flex-col lg:flex-row">
          <div>
            <img src={book.img} />
          </div>
          <div>
            <div>
              <h1>{book.title}</h1>
              <h3>by {book.author}</h3>
            </div>
            <div>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPage;
