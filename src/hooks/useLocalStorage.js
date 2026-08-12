import { useEffect, useState } from "react";

function readValue(key, initialValue) {
  try {
    const stored = window.localStorage.getItem(key);

    if (stored === null) {
      return initialValue;
    }

    return JSON.parse(stored);
  } catch {
    return initialValue;
  }
}

export default function useLocalStorage(
  key,
  initialValue
) {
  const [value, setValue] = useState(() =>
    readValue(key, initialValue)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch {
      // The application remains usable when browser
      // storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}
