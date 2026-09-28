const BookTable = ({ books, getAuthorName, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-[15px] text-slate-600">
        <thead className="bg-slate-200 text-xs uppercase font-medium text-slate-800">
          <tr>
            <th className="px-6 py-4 font-semibold">#</th>
            <th className="px-6 py-4 font-semibold">Title</th>

            <th className="px-6 py-4 font-semibold">Author</th>

            <th className="px-6 py-4 font-semibold">Category</th>

            <th className="px-6 py-4 font-semibold">Availability</th>

            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => (
            <tr
              key={book.id}
              className="border-t border-slate-300 transition hover:bg-slate-50"
            >
              <td className="px-6 py-4 text-[15px] font-medium text-slate-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 text-[15px] font-medium text-slate-800">
                {book.title}
              </td>

              <td className="px-6 py-4 text-[15px] text-slate-600">
                {getAuthorName(book.authorId)}
              </td>

              <td className="px-6 py-4 text-[15px] text-slate-600">
                {book.category}
              </td>

              <td className="px-6 py-4">
                {book.available ? (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Available
                  </span>
                ) : (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                    Borrowed
                  </span>
                )}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(book)}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-[#087FAF] transition hover:bg-sky-50"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(book)}
                    disabled={!book.available}
                    className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
