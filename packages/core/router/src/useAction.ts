import { useContext } from "react";
import type { Action } from "history";

import { ActionContext } from "./ActionContext";

const useAction = (): Action => {
  return useContext(ActionContext) as Action;
};

export { useAction };
