import React from "react";

const WhiteBoardContext = React.createContext({});

function WhiteBoardProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [ctx, setCtx] = React.useState(null);

  const value = { user, setUser, ctx, setCtx };

  return <WhiteBoardContext.Provider value={value}>{children}</WhiteBoardContext.Provider>;
}

export default WhiteBoardProvider;
