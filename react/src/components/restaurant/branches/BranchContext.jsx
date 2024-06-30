import { createContext, useContext, useState } from "react";

export const BranchContext = createContext();

export function BranchProvider({ children }) {
  const [branch, setBranch] = useState(null);
  return (
    <BranchContext.Provider value={{branch, setBranch }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  return useContext(BranchContext);
}
