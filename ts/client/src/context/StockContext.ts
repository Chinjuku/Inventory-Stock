import { createContext } from "react";

export type Stock = {
    item: string;
    amount: number;
    note?: string;
    import_date: Date;
    name: string;
    expire_in: string;
    expire_in_type: string;
};

export type StockContextType = {
  stock: Stock | null;
  setStock: React.Dispatch<React.SetStateAction<Stock | null>>;
};

export const StockContext = createContext({} as StockContextType);