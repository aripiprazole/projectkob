import { useEffect, useState } from "react";
import { Observable } from "rxjs";

function useObservable<T>(observable?: Observable<T>) {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const subscription = observable?.subscribe(setState);

    return () => subscription?.unsubscribe();
  }, [observable]);

  return [state, setState];
}

export default useObservable;
