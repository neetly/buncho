import { createContext } from "react";
import type { Action } from "history";

const ActionContext = createContext<Action | null>(null);

export { ActionContext };
