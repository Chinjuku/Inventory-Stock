import { useState } from "react";
import { Stock } from "./StockContext";
import { StockContext } from "./StockContext";

type StockProviderProps = {
  children: React.ReactNode;
};

export const StockContextProvider = ({ children }: StockProviderProps) => {
  const [stock, setStock] = useState<Stock | null>(null);
  return (
    <StockContext.Provider value={{ stock, setStock }}>
      {children}
    </StockContext.Provider>
  );
};
