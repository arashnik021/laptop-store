function StatusBadge({
  children,
  variant = "primary",
  icon,
  className = "",
}) {
  const badgeClassName = `
    status-badge
    status-badge--${variant}
    ${className}
  `.trim();

  return (
    <span className={badgeClassName}>
      {icon}
      {children}
    </span>
  );
}

export default StatusBadge;
