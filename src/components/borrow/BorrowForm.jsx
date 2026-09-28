const BorrowForm = ({
  books,
  borrowForm,
  setBorrowForm,
  onSubmit,
  onCancel,
  actionLoading,
}) => {
  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-800">
        New Borrowing
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Book
          </label>

          <select
            value={borrowForm.bookId}
            onChange={(event) =>
              setBorrowForm({
                ...borrowForm,
                bookId: event.target.value,
              })
            }
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-sky-100"
          >
            <option value="">Select a book</option>

            {books
              .filter((book) => book.available)
              .map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Borrower Name
          </label>

          <input
            type="text"
            value={borrowForm.borrowerName}
            onChange={(event) =>
              setBorrowForm({
                ...borrowForm,
                borrowerName: event.target.value,
              })
            }
            placeholder="Enter borrower name"
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Borrow Date
          </label>

          <input
            type="date"
            value={borrowForm.borrowDate}
            onChange={(event) =>
              setBorrowForm({
                ...borrowForm,
                borrowDate: event.target.value,
              })
            }
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-sky-100"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={actionLoading}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={actionLoading}
            className="rounded-lg bg-[#0B9BD7] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0787BD] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {actionLoading ? "Borrowing..." : "Borrow Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BorrowForm;
