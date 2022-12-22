import { FetchLoadingScreen } from "@/components/loading-screen";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProviderProps {
  children: ReactNode | ReactNode[];
}

interface ContextProps {
  successNotification: (msg: string) => void;
  warningNotification: (msg: string) => void;
  errorNotification: (msg: string) => void;
  fetchLoadingScreen: (value: boolean) => void;
}

const Context = createContext({} as ContextProps);

export function GlobalToolsContextProvider({ children }: ProviderProps) {
  const [loadingScreen, setLoadingScreen] = useState(false);

  const errorNotification = (msg: string) =>
    toast.error(msg, {
      autoClose: 2000,
    });
  const successNotification = (msg: string) =>
    toast.success(msg, {
      autoClose: 2000,
    });
  const warningNotification = (msg: string) =>
    toast.warning(msg, {
      autoClose: 2000,
    });

  const fetchLoadingScreen = (value: boolean) => {
    setLoadingScreen(value);
  };

  return (
    <Context.Provider
      value={{
        successNotification,
        errorNotification,
        warningNotification,
        fetchLoadingScreen,
      }}
    >
      <ToastContainer />
      <FetchLoadingScreen state={loadingScreen} />
      {children}
    </Context.Provider>
  );
}

export const useGlobalTools = () => useContext(Context);
