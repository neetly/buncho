import { ReactNode, ReactElement, useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ActionContext } from "./ActionContext";

const BrowserRouter = ({
  window,
  children,
}: {
  window?: Window;
  children?: ReactNode;
}): ReactElement => {
  const [history] = useState(() => createBrowserHistory({ window }));

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    return history.listen(setState);
  }, [history]);

  return (
    <Router navigator={history} action={state.action} location={state.location}>
      <ActionContext.Provider value={state.action}>
        {children}
      </ActionContext.Provider>
    </Router>
  );
};

export { BrowserRouter };
