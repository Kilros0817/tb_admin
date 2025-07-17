import { createContext, useContext } from "react";
import { Web3AuthInstance } from "@/types";

interface TBContextType {
  web3Auth: Web3AuthInstance | null;
}

export const TBContext = createContext<TBContextType>({} as TBContextType);

export const useTBContext = () => useContext(TBContext);
