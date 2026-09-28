const BookFilters = ({
  authors,
  categories,
  authorFilter,
  categoryFilter,
  setAuthorFilter,
  setCategoryFilter,
}) => {
  return (
    <div className="flex gap-3">

      <select
        value={authorFilter}
        onChange={(event) => setAuthorFilter(event.target.value)}
        className="rounded-md border px-3 py-2"
      >
        <option value="">All Authors</option>

        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>

      <select
        value={categoryFilter}
        onChange={(event) => setCategoryFilter(event.target.value)}
        className="rounded-md border px-3 py-2"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

    </div>
  );
};

export default BookFilters;