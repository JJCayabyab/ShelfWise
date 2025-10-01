import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const BookPage = () => {
  const { id } = useParams();
  const { books } = useBookStore();

  // If books are already in store (fetched at home)
  const book = books.find((b) => String(b.id) === id);

  if (!book) return <p className="p-4">Book not found.</p>;
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-8 md:px-12 md:py-14 lg:px-14 lg:py-18">
        <Link to={"/"}>
          {" "}
          <ArrowLeft
            size={24}
            className="cursor-pointer mb-2"
            onClick={() => window.history.back()}
          />
        </Link>
        <div
          className="flex flex-col items-center
        lg:flex-row  lg:items-start lg:gap-10"
        >
          <div>
            <img src={book.img} className="max-h-96  lg:max-h-full" />
          </div>
          <div>
            <div className="mt-5 mb-5 lg:mt-0 lg:mb-5">
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <h3 className="text-lg font-semibold">by {book.author}</h3>
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
