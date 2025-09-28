import React, { useEffect } from "react";
import { useBookStore } from "../store/bookStore";
import { RefreshCwIcon, DeleteIcon, EditIcon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Home = () => {
  const { books, loading, error, fetchBooks, deleteBook } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const confirmDelete = (book, deleteBook) => {
    toast(
      (t) => (
        <div>
          Are you sure you want to delete <b>{book.title}</b>?
          <div className="mt-3 flex gap-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => {
                deleteBook(book.id);
                toast.dismiss(t.id);
                toast.success(`${book.title} deleted`);
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-8 md:px-12 md:py-14 lg:px-14 lg:py-18">
      <div className="flex items-center justify-center py-5 gap-5 w-full">
        <div className="w-2/3">
          <label className="input w-full  ">
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
            <input type="search" required placeholder="Search" />
          </label>
        </div>
        <div className="">
          <RefreshCwIcon onClick={fetchBooks} className="size-5" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <div
            key={index}
            className="flex h-full min-h-[200px] rounded-2xl bg-base-100 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
          >
            {/* Image side */}
            <div className=" flex w-2/5 items-center">
              <img
                src={book.img}
                alt={book.title}
                className=" h-full rounded-bl-2xl rounded-tl-2xl"
              />
            </div>

            {/* Details side */}
            <div className="w-2/3 flex flex-col justify-between p-4 h-full">
              <div className="flex-1">
                <h2 className="text-lg font-bold line-clamp-2">{book.title}</h2>
                <p className="text-sm opacity-80">by {book.author}</p>
                <p className="text-xs mt-1">Published: {book.year_published}</p>

                <p className="text-sm mt-2 text-gray-600 line-clamp-3">
                  This is a short summary of the book. It gives a quick overview
                  of the story or main ideas to help readers decide if they want
                  to read it.
                </p>
              </div>
              <div className="flex gap-2 mt-3 justify-end">
                <div className="flex gap-3 mt-3 ">
                  <Link to={`/books/${book.id}`}>
                    <EditIcon className="w-5 h-5 text-green-600 hover:text-green-800 cursor-pointer transition" />
                  </Link>
                  <DeleteIcon
                    onClick={() => confirmDelete(book, deleteBook)}
                    className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer transition"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
