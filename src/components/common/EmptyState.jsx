import { Link } from "react-router-dom";

import ActionButton from "./ActionButton";

function EmptyState({
  icon = "bi-inbox",
  title,
  description,
  actionText,
  actionTo,
  onAction,
}) {
  const hasAction = Boolean(actionText);
  const isLinkAction = Boolean(actionTo);

  return (
    <section className="empty-state">
      <div className="empty-state__icon">
        <i
          className={`bi ${icon}`}
          aria-hidden="true"
        />
      </div>

      <h2>{title}</h2>

      {description && (
        <p>{description}</p>
      )}

      {hasAction &&
        (isLinkAction ? (
          <Link
            to={actionTo}
            className="action-button action-button--primary"
          >
            {actionText}
          </Link>
        ) : (
          <ActionButton onClick={onAction}>
            {actionText}
          </ActionButton>
        ))}
    </section>
  );
}

export default EmptyState;
