import { createContext, ReactNode, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProviderProps {
  children: ReactNode | ReactNode[];
}

interface ContextProps {
  successNotification: (msg: string) => void;
  errorNotification: (msg: string) => void;
}

const Context = createContext({} as ContextProps);

export function GlobalToolsContextProvider({ children }: ProviderProps) {
  const errorNotification = (msg: string) => toast.error(msg);
  const successNotification = (msg: string) =>
    toast.success(msg, {
      autoClose: 2000,
    });

  return (
    <Context.Provider value={{ successNotification, errorNotification }}>
      <ToastContainer />
      {children}
    </Context.Provider>
  );
}

export const useGlobalTools = () => useContext(Context);
