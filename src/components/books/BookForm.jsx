const BookForm = ({
  bookForm,
  setBookForm,
  authors,
  editingBookId,
  onSubmit,
  onCancel,
  actionLoading,
}) => {
  const isEditing = editingBookId !== null;

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          {isEditing ? "Edit Book" : "Add Book"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditing
            ? "Update book information"
            : "Add a new book to the library"}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Title
          </label>

          <input
            type="text"
            value={bookForm.title}
            onChange={(event) =>
              setBookForm({
                ...bookForm,
                title: event.target.value,
              })
            }
            required
            placeholder="Enter book title"
            className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-[#0B9BD7]/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Author
          </label>

          <select
            value={bookForm.authorId}
            onChange={(event) =>
              setBookForm({
                ...bookForm,
                authorId: event.target.value,
              })
            }
            required
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-[#0B9BD7]/20"
          >
            <option value="">Select Author</option>

            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Category
          </label>

          <input
            type="text"
            value={bookForm.category}
            onChange={(event) =>
              setBookForm({
                ...bookForm,
                category: event.target.value,
              })
            }
            required
            placeholder="Enter category"
            className="w-full rounded-md border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-[#0B9BD7]/20"
          />
        </div>

        <div className="flex items-center">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
            <input
              type="checkbox"
              checked={bookForm.available}
              onChange={(event) =>
                setBookForm({
                  ...bookForm,
                  available: event.target.checked,
                })
              }
              className="h-4 w-4 rounded border-slate-300 text-[#0B9BD7] focus:ring-[#0B9BD7]"
            />
            Available
          </label>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={actionLoading}
          className="rounded-md bg-[#0B9BD7] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0787BD] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {actionLoading ? "Saving..." : isEditing ? "Update Book" : "Add Book"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;
