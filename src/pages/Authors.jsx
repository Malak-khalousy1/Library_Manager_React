import { useEffect, useState } from "react";

import { get, add, update, remove } from "../services/api";

import AuthorTable from "../components/outhers/AuthorTable";
import AuthorForm from "../components/outhers/AuthorForm";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const authorsUrl = "http://localhost:3000/authors";
const booksUrl = "http://localhost:3000/books";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingAuthorId, setEditingAuthorId] = useState(null);

  const [authorForm, setAuthorForm] = useState({
    name: "",
    nationality: "",
  });

  const [authorToDelete, setAuthorToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const authorsData = await get(authorsUrl);
      const booksData = await get(booksUrl);

      setAuthors(authorsData);
      setBooks(booksData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddForm = () => {
    setEditingAuthorId(null);

    setAuthorForm({
      name: "",
      nationality: "",
    });

    setShowForm(true);
  };

  const editAuthor = (author) => {
    setEditingAuthorId(author.id);

    setAuthorForm({
      name: author.name,
      nationality: author.nationality,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingAuthorId(null);

    setAuthorForm({
      name: "",
      nationality: "",
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);
      setError("");

      if (editingAuthorId === null) {
        await add(authorsUrl, authorForm);
      } else {
        await update(authorsUrl, authorForm, editingAuthorId);
      }

      await loadData();
      closeForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteAuthor = async (author) => {
    try {
      setActionLoading(true);
      setError("");

      const authorBooks = books.filter((book) => book.authorId === author.id);

      const hasBorrowedBooks = authorBooks.some((book) => !book.available);

      if (hasBorrowedBooks) {
        setError("You cannot delete an author who has borrowed books.");
        return;
      }

      for (const book of authorBooks) {
        await remove(booksUrl, book.id);
      }

      await remove(authorsUrl, author.id);

      await loadData();
      setAuthorToDelete(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading authors..." />;
  }

  if (error && authors.length === 0) {
    return <ErrorState message={error} onRetry={loadData} loading={loading} />;
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Authors</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your library authors
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="rounded-lg bg-[#0B9BD7] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0787BD]"
        >
          + Add Author
        </button>
      </div>

      {error && authors.length > 0 && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{error}</p>

          <button
            onClick={() => setError("")}
            className="text-sm text-red-400 transition hover:text-red-600"
          >
            ✕
          </button>
        </div>
      )}

      {showForm && (
        <AuthorForm
          authorForm={authorForm}
          setAuthorForm={setAuthorForm}
          editingAuthorId={editingAuthorId}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
          actionLoading={actionLoading}
        />
      )}

      <AuthorTable
        authors={authors}
        books={books}
        onEdit={editAuthor}
        onDelete={setAuthorToDelete}
      />

      <DeleteConfirmModal
        item={authorToDelete}
        itemName={authorToDelete?.name}
        onCancel={() => setAuthorToDelete(null)}
        onConfirm={() => deleteAuthor(authorToDelete)}
        loading={actionLoading}
      />
    </div>
  );
};

export default Authors;
