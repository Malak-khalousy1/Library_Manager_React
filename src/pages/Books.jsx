import { useEffect, useState } from "react";

import { get, remove, add, update } from "../services/api";

import BookFilters from "../components/books/BookFilters";
import BookForm from "../components/books/BookForm";
import BookTable from "../components/books/BookTable";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const booksUrl = "http://localhost:3000/books";
const authorsUrl = "http://localhost:3000/authors";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [bookForm, setBookForm] = useState({
    title: "",
    authorId: "",
    category: "",
    available: true,
  });

  const [editingBookId, setEditingBookId] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const booksData = await get(booksUrl);
      const authorsData = await get(authorsUrl);

      setBooks(booksData);
      setAuthors(authorsData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setBookForm({
      title: "",
      authorId: "",
      category: "",
      available: true,
    });

    setEditingBookId(null);
    setShowForm(true);
  };

  const handleEditBook = (book) => {
    setBookForm({
      title: book.title,
      authorId: book.authorId,
      category: book.category,
      available: book.available,
    });

    setEditingBookId(book.id);
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);
      setError("");

      if (editingBookId === null) {
        await add(booksUrl, bookForm);
      } else {
        await update(booksUrl, bookForm, editingBookId);
      }

      await loadData();
      closeForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBookId(null);
  };

  const deleteBook = async (id) => {
    try {
      setActionLoading(true);
      setError("");

      await remove(booksUrl, id);
      await loadData();

      setBookToDelete(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const getAuthorName = (authorId) => {
    const author = authors.find((author) => author.id === authorId);

    return author ? author.name : "Unknown Author";
  };

  const categories = [...new Set(books.map((book) => book.category))];

  const filteredBooks = books.filter((book) => {
    const matchesAuthor = authorFilter === "" || book.authorId === authorFilter;

    const matchesCategory =
      categoryFilter === "" || book.category === categoryFilter;

    return matchesAuthor && matchesCategory;
  });

  if (loading) {
    return <LoadingState message="Loading books..." />;
  }

  if (error && books.length === 0) {
    return <ErrorState message={error} onRetry={loadData} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Books</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your library books
            </p>
          </div>

          <div className="flex items-center gap-5">
            <BookFilters
              authors={authors}
              categories={categories}
              authorFilter={authorFilter}
              categoryFilter={categoryFilter}
              setAuthorFilter={setAuthorFilter}
              setCategoryFilter={setCategoryFilter}
            />

            <button
              onClick={openAddForm}
              className="rounded-md bg-[#0B9BD7] px-4 py-2 text-white"
            >
              + Add Book
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        {showForm && (
          <BookForm
            bookForm={bookForm}
            setBookForm={setBookForm}
            authors={authors}
            editingBookId={editingBookId}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            actionLoading={actionLoading}
          />
        )}

        {filteredBooks.length === 0 ? (
          <div className="rounded-lg border bg-white p-10 text-center">
            <p className="font-medium text-slate-700">No books found</p>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your filters.
            </p>
          </div>
        ) : (
          <BookTable
            books={filteredBooks}
            getAuthorName={getAuthorName}
            onEdit={handleEditBook}
            onDelete={(book) => setBookToDelete(book)}
          />
        )}

        <DeleteConfirmModal
          item={bookToDelete}
          itemName={bookToDelete?.title}
          onCancel={() => setBookToDelete(null)}
          onConfirm={() => deleteBook(bookToDelete.id)}
          loading={actionLoading}
        />
      </div>
    </div>
  );
};

export default Books;
