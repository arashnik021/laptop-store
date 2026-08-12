function LoadingSkeleton({
  variant = "product-grid",
  count = 4,
}) {
  if (variant === "product-details") {
    return (
      <div className="product-details-grid">
        <div
          className="skeleton"
          style={{ minHeight: 380 }}
        />

        <div
          className="skeleton"
          style={{ minHeight: 380 }}
        />
      </div>
    );
  }

  return (
    <div className="product-grid">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="product-card"
        >
          <div
            className="skeleton"
            style={{ aspectRatio: "1/.78" }}
          />

          <div
            className="skeleton mt-3"
            style={{
              height: 18,
              width: "35%",
            }}
          />

          <div
            className="skeleton mt-2"
            style={{ height: 42 }}
          />

          <div
            className="skeleton mt-3"
            style={{
              height: 22,
              width: "60%",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
