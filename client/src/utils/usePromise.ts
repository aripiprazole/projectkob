import { useState, useEffect, useCallback } from "react";

function usePromise<T>(promise: () => Promise<T>): [T, boolean, Error | null] {
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const promiseCallback = useCallback(promise, []);

  useEffect(() => {
    promiseCallback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [promiseCallback]);

  return [value as T, loading, error];
}

export default usePromise;
