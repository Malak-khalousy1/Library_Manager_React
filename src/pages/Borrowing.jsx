import { useEffect, useState } from "react";

import { get, add, update } from "../services/api";

import BorrowForm from "../components/borrow/BorrowForm";
import BorrowTable from "../components/borrow/BorrowTable";

import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

const Borrowing = () => {
  const borrowsUrl = "http://localhost:3000/borrows";
  const booksUrl = "http://localhost:3000/books";

  const [borrows, setBorrows] = useState([]);
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [borrowForm, setBorrowForm] = useState({
    bookId: "",
    borrowerName: "",
    borrowDate: new Date().toISOString().split("T")[0],
  });

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [borrowsData, booksData] = await Promise.all([
        get(borrowsUrl),
        get(booksUrl),
      ]);

      setBorrows(borrowsData);
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

  const getBookTitle = (bookId) => {
    const book = books.find((book) => book.id === bookId);

    return book ? book.title : "Unknown Book";
  };

  const handleBorrowSubmit = async (event) => {
    event.preventDefault();

    setActionLoading(true);
    setError("");

    try {
      const selectedBook = books.find((book) => book.id === borrowForm.bookId);

      if (!selectedBook) {
        throw new Error("Book not found");
      }

      if (!selectedBook.available) {
        throw new Error("This book is not available");
      }

      await add(borrowsUrl, {
        bookId: borrowForm.bookId,
        borrowerName: borrowForm.borrowerName,
        borrowDate: borrowForm.borrowDate,
        returnDate: "",
      });

      await update(
        booksUrl,
        {
          ...selectedBook,
          available: false,
        },
        selectedBook.id,
      );

      setBorrowForm({
        bookId: "",
        borrowerName: "",
        borrowDate: new Date().toISOString().split("T")[0],
      });

      setShowForm(false);

      await loadData();
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReturn = async (borrow) => {
    setActionLoading(true);
    setError("");

    try {
      const selectedBook = books.find((book) => book.id === borrow.bookId);

      if (!selectedBook) {
        throw new Error("Book not found");
      }

      const returnDate = new Date().toISOString().split("T")[0];

      await update(
        borrowsUrl,
        {
          ...borrow,
          returnDate: returnDate,
        },
        borrow.id,
      );

      await update(
        booksUrl,
        {
          ...selectedBook,
          available: true,
        },
        selectedBook.id,
      );

      await loadData();
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading borrowing data..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadData} loading={loading} />;
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Borrowing</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage borrowed and returned books
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-[#0B9BD7] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0787BD]"
        >
          {showForm ? "Close Form" : "Borrow a Book"}
        </button>
      </div>

      {showForm && (
        <BorrowForm
          books={books}
          borrowForm={borrowForm}
          setBorrowForm={setBorrowForm}
          onSubmit={handleBorrowSubmit}
          onCancel={() => setShowForm(false)}
          actionLoading={actionLoading}
        />
      )}

      <BorrowTable
        borrows={borrows}
        getBookTitle={getBookTitle}
        onReturn={handleReturn}
        actionLoading={actionLoading}
      />
    </div>
  );
};

export default Borrowing;
