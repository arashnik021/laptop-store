import { Link } from "react-router-dom";

function Breadcrumb({ items = [] }) {
  return (
    <nav
      className="breadcrumb-custom"
      aria-label="مسیر فعلی"
    >
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const isLink = item.path && !isLastItem;

        return (
          <span
            key={`${item.label}-${index}`}
            className="d-inline-flex align-items-center gap-2"
          >
            {index > 0 && (
              <i
                className="bi bi-chevron-left breadcrumb-custom__separator"
                aria-hidden="true"
              />
            )}

            {isLink ? (
              <Link to={item.path}>
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLastItem ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
