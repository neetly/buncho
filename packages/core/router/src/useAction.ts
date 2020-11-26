import type { Action } from "history";
import { useContext } from "react";

import { ActionContext } from "./ActionContext";

const useAction = (): Action => {
  return useContext(ActionContext) as Action;
};

export { useAction };
