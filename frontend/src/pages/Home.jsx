import React, { useEffect } from "react";
import { useBookStore } from "../store/bookStore";
import { RefreshCwIcon, DeleteIcon, EditIcon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useThemeStore } from "../store/themeSelector";
const Home = () => {
  const { books, loading, error, fetchBooks, deleteBook } = useBookStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) {
    return (
      <>
        <div role="status" className="flex justify-center mt-20">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </>
    );
  }
  if (error) return <p>Error: {error}</p>;

  const confirmDelete = (book, deleteBook) => {
    toast(
      (t) => (
        <div>
          Are you sure you want to delete <b>{book.title}</b>?
          <div className="mt-3 flex gap-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={async () => {
                try {
                  await deleteBook(book.id);
                  toast.dismiss(t.id);
                  toast.success(`${book.title} deleted`);
                } catch (err) {
                  toast.dismiss(t.id);
                  toast.error(`Failed to delete ${book.title}: ${err}`);
                }
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
      <h1 className="w-1/2 mx-auto">
        ⚠️ This project is for **practice purposes only**. The site is deployed
        so everyone can freely add or delete items. Please don’t intentionally
        ruin or misuse it — it’s just for learning.
      </h1>
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
        <div>
          <RefreshCwIcon onClick={fetchBooks} className="size-5" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <div
            key={index}
            className={`flex h-full min-h-[200px] rounded-2xl bg-base-100 ${
              theme === "winter"
                ? "shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                : "shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            }`}
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
                <div className="flex flex-col ">
                  <h2 className="text-lg font-bold leading-normal line-clamp-2">
                    {book.title}
                  </h2>
                  <p className="text-sm opacity-80">
                    by {book.author} ({book.year_published})
                  </p>
                </div>

                <p className="text-sm mt-2 text-gray-600 line-clamp-3">
                  {book.description}
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
