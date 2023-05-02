import { createContext, useState } from "react";

export const SignedInContext = createContext({
  isSignedIn: false,
  setIsSignedIn: () => {},
});
export const SignedInProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const value = { isSignedIn, setIsSignedIn };
  return (
    <SignedInContext.Provider value={value}>
      {children}
    </SignedInContext.Provider>
  );
};
