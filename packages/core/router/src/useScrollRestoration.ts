import { Action } from "history";
import { useEffect, useRef } from "react";

import { useAction } from "./useAction";

const useScrollRestoration = (key: unknown): void => {
  const prevKey = useRef(key);
  const action = useAction();

  useEffect(() => {
    if (key !== prevKey.current) {
      prevKey.current = key;
      if (action === Action.Push) {
        window.scrollTo(0, 0);
      }
    }
  }, [key, action]);
};

export { useScrollRestoration };
