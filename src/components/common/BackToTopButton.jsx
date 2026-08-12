import useScrollPosition from "../../hooks/useScrollPosition";

function BackToTopButton() {
  const scrollY = useScrollPosition();

  const isVisible = scrollY > 380;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${isVisible ? "is-visible" : ""}`}
      aria-label="بازگشت به ابتدای صفحه"
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up" />
    </button>
  );
}

export default BackToTopButton;
