import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { Web3AuthInstance } from "@/types";

interface TBContextType {
  web3Auth: Web3AuthInstance | null;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const TBContext = createContext<TBContextType>({} as TBContextType);

export const useTBContext = () => useContext(TBContext);
