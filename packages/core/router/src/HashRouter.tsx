import { createHashHistory } from "history";
import { ReactElement, ReactNode, useLayoutEffect, useState } from "react";
import { Router } from "react-router-dom";

import { ActionContext } from "./ActionContext";

const HashRouter = ({
  window,
  children,
}: {
  window?: Window;
  children?: ReactNode;
}): ReactElement => {
  const [history] = useState(() => createHashHistory({ window }));

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

export { HashRouter };
