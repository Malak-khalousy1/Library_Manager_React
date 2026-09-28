const AuthorTable = ({ authors, books, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-[15px] text-slate-600">
        <thead className="bg-slate-200 text-xs font-medium uppercase text-slate-800">
          <tr>
            <th className="px-6 py-4 font-semibold">#</th>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Nationality</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {authors.map((author, index) => {
            const hasBorrowedBooks = books.some(
              (book) =>
                book.authorId === author.id && !book.available
            );

            return (
              <tr
                key={author.id}
                className="border-t border-slate-300 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4 text-[15px] font-medium text-slate-500">
                  {index + 1}
                </td>

                <td className="px-6 py-4 text-[15px] font-medium text-slate-800">
                  {author.name}
                </td>

                <td className="px-6 py-4 text-[15px] text-slate-600">
                  {author.nationality}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(author)}
                      className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-[#087FAF] transition hover:bg-sky-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(author)}
                      disabled={hasBorrowedBooks}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorTable;