import { useState, useEffect } from "react";

function useDebounce(value, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
