const AuthorForm = ({
  authorForm,
  setAuthorForm,
  editingAuthorId,
  onSubmit,
  onCancel,
  actionLoading,
}) => {
  const isEditing = editingAuthorId !== null;

  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-800">
        {isEditing ? "Edit Author" : "Add New Author"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Name
          </label>

          <input
            type="text"
            value={authorForm.name}
            onChange={(event) =>
              setAuthorForm({
                ...authorForm,
                name: event.target.value,
              })
            }
            placeholder="Enter author name"
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#0B9BD7] focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Nationality
          </label>

          <input
            type="text"
            value={authorForm.nationality}
            onChange={(event) =>
              setAuthorForm({
                ...authorForm,
                nationality: event.target.value,
              })
            }
            placeholder="Enter nationality"
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
            {actionLoading
              ? "Saving..."
              : isEditing
                ? "Update Author"
                : "Add Author"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;
