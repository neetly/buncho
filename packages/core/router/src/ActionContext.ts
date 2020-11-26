import type { Action } from "history";
import { createContext } from "react";

const ActionContext = createContext<Action | null>(null);

export { ActionContext };
