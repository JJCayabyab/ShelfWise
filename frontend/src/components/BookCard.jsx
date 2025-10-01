import { Link, useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";
import BookFormModal from "./BookFormModal";
import { useState } from "react";

const BookCard = ({ book, theme, deleteBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const mode = "update";
  const navigate = useNavigate();

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
                  toast.success(`${book.title} deleted`, { duration: 4000 });
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
    <>
      <div
        onClick={() => navigate(`/book/${book.id}`)}
        className={`flex h-50 rounded-2xl bg-base-100 cursor-pointer ${
          theme === "winter"
            ? "shadow-[0_0_15px_rgba(0,0,0,0.2)]"
            : "shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Image side */}
        <div className="flex w-2/5 items-center">
          <img
            src={book.img}
            alt={book.title}
            className="w-full h-full rounded-bl-2xl rounded-tl-2xl object-cover"
          />
        </div>

        {/* Details side */}
        <div className="w-2/3 flex flex-col justify-between p-4 h-full">
          <div className="flex-1">
            <div className="flex flex-col">
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

          {/* Action buttons */}
          <div className="flex gap-3 mt-3 justify-end">
            <EditIcon
              onClick={(e) => {
                e.stopPropagation(); 
                setIsOpen(true);
              }}
              className="w-5 h-5 text-green-600 hover:text-green-800 cursor-pointer transition"
            />

            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete(book, deleteBook);
              }}
              className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer transition"
            />
          </div>
        </div>
      </div>

      <BookFormModal
        book={book}
        isOpen={isOpen}
        mode={mode}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default BookCard;
