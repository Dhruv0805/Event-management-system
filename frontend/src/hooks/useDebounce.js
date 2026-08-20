import { useEffect, useState } from 'react';

// Debounces a fast-changing value (e.g. a search input) so dependent
// effects (like an API call) don't fire on every keystroke.
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;
