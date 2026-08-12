import { useToast } from "../../contexts/ToastContext";

const iconByType = {
  success: "bi-check-circle-fill",
  error: "bi-x-circle-fill",
  warning: "bi-exclamation-triangle-fill",
  info: "bi-info-circle-fill",
};

function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="toast-container"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const icon = iconByType[toast.type] || iconByType.info;

        const role =
          toast.type === "error" || toast.type === "warning"
            ? "alert"
            : "status";

        return (
          <div
            key={toast.id}
            className={`toast-message toast-message--${toast.type}`}
            role={role}
          >
            <i
              className={`bi ${icon}`}
              aria-hidden="true"
            />

            <span>{toast.message}</span>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="بستن پیام"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Toast;
