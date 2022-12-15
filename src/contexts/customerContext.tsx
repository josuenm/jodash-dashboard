import { customerApi } from "@/services/axios/customerApi";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomerProps } from "../@types/customerType";

interface ContextProps {
  customers: CustomerProps[];
}

interface ProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

const Context = createContext({} as ContextProps);

export function CustomerContextProvider({ children }: ProviderProps) {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);

  const getSales = useCallback(async () => {
    const res = await customerApi.getSales();

    if (res.data.length !== customers.length) {
      setCustomers(res.data);
    }
  }, []);

  useEffect(() => {
    getSales();
  }, []);

  return <Context.Provider value={{ customers }}>{children}</Context.Provider>;
}

export const useCustomer = () => useContext(Context);
