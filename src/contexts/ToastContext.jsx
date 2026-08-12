import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((items) =>
      items.filter((item) => item.id !== id)
    );
  }, []);

  const showToast = useCallback(
    (message, type = "info", duration = 3500) => {
      const id = `${Date.now()}-${Math.random()
        .toString(16)
        .slice(2)}`;

      setToasts((items) => [
        ...items,
        {
          id,
          message,
          type,
        },
      ]);

      window.setTimeout(() => {
        removeToast(id);
      }, duration);

      return id;
    },
    [removeToast]
  );

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      removeToast,
      clearToasts,
    }),
    [
      toasts,
      showToast,
      removeToast,
      clearToasts,
    ]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast باید داخل ToastProvider استفاده شود.");
  }

  return context;
}
