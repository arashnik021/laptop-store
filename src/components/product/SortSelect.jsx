import { SORT_OPTIONS } from "../../utils/constants";

function SortSelect({
  value,
  onChange,
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      <label
        htmlFor="sort-products"
        className="small text-muted"
      >
        مرتب‌سازی:
      </label>

      <select
        id="sort-products"
        className="form-select form-select-sm"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        style={{ width: "auto" }}
      >
        {SORT_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelect;
