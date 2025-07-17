import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { Web3AuthInstance } from "@/types";

interface TBContextType {
  web3Auth: Web3AuthInstance | null;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const TBContext = createContext<TBContextType>({} as TBContextType);

export const useTBContext = () => useContext(TBContext);
