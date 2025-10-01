import React, { useEffect } from "react";
import { useState } from "react";
import { useBookStore } from "../store/bookStore";
import toast from "react-hot-toast";

const BookFormModal = ({ isOpen, onClose, mode, book }) => {
  const { addBook, updateBook } = useBookStore();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year_published: null,
    img: "",
    description: "",
  });

  //this takes effect if the mode is update
  //formData will have values at this point
  useEffect(() => {
    if (mode === "update") {
      setFormData({
        title: book.title,
        author: book.author,
        year_published: book.year_published,
        img: book.img,
        description: book.description,
      });
    }
  },[mode,book]);

  //handle submit of add and update function depending on mode(add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    //for add function
    if (mode === "add") {
      try {
        await addBook(formData);
        toast.success("Book added!");
        onClose();
        setFormData({
          title: "",
          author: "",
          year_published: null,
          img: "",
          description: "",
        });
      } catch (err) {
        toast.error(
          "Failed to add book: " + (err.response?.data?.message || err.message)
        );
      }
    }
    //for update function
    else if (mode === "update") {
      try {
        await updateBook(book.id, formData);
        toast.success("Book updated!");
        onClose();
        setFormData({
          title: "",
          author: "",
          year_published: null,
          img: "",
          description: "",
        });
      } catch (err) {
        toast.error(
          "Failed to update book: " +
            (err.response?.data?.message || err.message)
        );
      }
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {mode === "add" ? "Add a book" : "Update a book"}
        </h3>

        <form
          id="book-form"
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="title" className="block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required={mode === "add"}
            />
          </div>

          <div>
            <label htmlFor="author" className="block font-medium">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="input input-bordered w-full"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required={mode === "add"}
            />
          </div>

          <div>
            <label htmlFor="year" className="block font-medium">
              Year Published
            </label>
            <input
              type="number"
              id="year"
              name="year_published"
              className="input input-bordered w-full"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required={mode === "add"}
            />
          </div>

          <div>
            <label htmlFor="img" className="block font-medium">
              Image URL
            </label>
            <input
              type="text"
              id="img"
              name="img"
              className="input input-bordered w-full"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required={mode === "add"}
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              maxLength={1000}
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Enter book description (max 1000 characters)"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              required={mode === "add"}
            />
            <p className="text-xs opacity-70 mt-1">Max 1000 characters.</p>
          </div>
        </form>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" type="submit" form="book-form">
            {mode === "add" ? "Add" : "Save Changes"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default BookFormModal;
