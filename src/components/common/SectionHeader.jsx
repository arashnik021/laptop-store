import { Link } from "react-router-dom";

function SectionHeader({ title, subtitle, linkTo, linkText = "مشاهده همه ",}) {
  const hasSubtitle = Boolean(subtitle);
  const hasLink = Boolean(linkTo);

  return (
    <div className="section-header">
      <div>
        <h2 className="section-header__title">
          {title}
        </h2>

        {hasSubtitle && (
          <p className="section-header__subtitle">
            {subtitle}
          </p>
        )}
      </div>

      {hasLink && (
        <Link
          className="section-header__link"
          to={linkTo}
        >
          {linkText}

          <i
            className="bi bi-arrow-left"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
