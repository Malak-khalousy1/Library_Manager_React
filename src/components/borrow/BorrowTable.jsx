const BorrowTable = ({ borrows, getBookTitle, onReturn, actionLoading }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-[15px] text-slate-600">
        <thead className="bg-slate-200 text-xs uppercase font-medium text-slate-800">
          <tr>
            <th className="px-6 py-4 font-semibold">#</th>
            <th className="px-6 py-4 font-semibold">Book</th>
            <th className="px-6 py-4 font-semibold">Borrower</th>
            <th className="px-6 py-4 font-semibold">Borrow Date</th>
            <th className="px-6 py-4 font-semibold">Return Date</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {borrows.map((borrow, index) => {
            const isReturned = borrow.returnDate !== "";

            return (
              <tr
                key={borrow.id}
                className="border-t border-slate-300 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4 text-[15px] font-medium text-slate-500">
                  {index + 1}
                </td>

                <td className="px-6 py-4 text-[15px] font-medium text-slate-800">
                  {getBookTitle(borrow.bookId)}
                </td>

                <td className="px-6 py-4 text-[15px] text-slate-600">
                  {borrow.borrowerName}
                </td>

                <td className="px-6 py-4 text-[15px] text-slate-600">
                  {borrow.borrowDate}
                </td>

                <td className="px-6 py-4 text-[15px] text-slate-600">
                  {borrow.returnDate || "-"}
                </td>

                <td className="px-6 py-4">
                  {isReturned ? (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      Returned
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      Borrowed
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {!isReturned && (
                    <button
                      onClick={() => onReturn(borrow)}
                      disabled={actionLoading}
                      className="rounded-md border border-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading ? "Returning..." : "Return"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowTable;
