function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "جست‌وجوی لپ‌تاپ...",
  compact = false,
}) {
  const formClassName = compact ? "" : "mb-4";

  return (
    <form
      className={formClassName}
      onSubmit={onSubmit}
    >
      <label
        className="visually-hidden-custom"
        htmlFor="products-search"
      >
        جست‌وجوی محصول
      </label>

      <div className="search-wrap">
        <input
          id="products-search"
          className="form-control"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
        />

        <button
          type="submit"
          aria-label="جست‌وجو"
        >
          <i className="bi bi-search" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
