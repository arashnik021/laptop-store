function ActionButton({
  children,
  variant = "primary",
  size = "",
  icon,
  isLoading = false,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) {
  const isDisabled = disabled || isLoading;

  const buttonClassName = `action-button action-button--${variant} ${
    size ? `action-button--${size}` : ""
  } ${className}`.trim();

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={buttonClassName}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          <span>در حال پردازش...</span>
        </>
      ) : (
        <>
          {icon && <span className="action-button__icon">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}

export default ActionButton;
