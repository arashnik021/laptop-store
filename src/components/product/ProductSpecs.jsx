const labels = {
  cpu: "پردازنده",
  ram: "حافظه رم",
  storage: "حافظه داخلی",
  display: "نمایشگر",
  gpu: "کارت گرافیک",
  weight: "وزن",
  battery: "باتری",
  operatingSystem: "سیستم‌عامل",
};

function ProductSpecs({
  specs,
  variant = "full",
  title = "مشخصات فنی",
}) {
  const entries = Object.entries(specs || {});

  const visibleEntries =
    variant === "compact"
      ? entries.slice(0, 4)
      : entries;

  return (
    <section>
      <h2 className="h5 fw-bold mb-3">
        {title}
      </h2>

      <div className="spec-list">
        {visibleEntries.map(([key, value]) => (
          <div
            key={key}
            className="spec-list__item"
          >
            <span className="spec-list__label">
              {labels[key] || key}
            </span>

            <span className="spec-list__value">
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductSpecs;
