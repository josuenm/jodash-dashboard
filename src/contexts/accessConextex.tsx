import { SignInProps } from "@/@types/userType";
import { accessApi } from "@/services/axios/accessApi";
import { setCookie } from "nookies";
import { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalTools } from "./globalToolsContext";

interface ContextProps {
  signIn: (data: SignInProps) => Promise<void>;
  signUp: () => Promise<void>;
  signOut: () => void;
}

interface ProviderProps {
  children: ReactNode | ReactNode[];
}

const Context = createContext({} as ContextProps);

export function AccessContextProvider({ children }: ProviderProps) {
  const navigate = useNavigate();

  const { successNotification, errorNotification, fetchLoadingScreen } =
    useGlobalTools();

  const signIn = async (data: SignInProps) => {
    fetchLoadingScreen(true);
    const res = await accessApi.signIn(data);
    fetchLoadingScreen(false);

    switch (res.status) {
      case 200:
        setCookie(res.data.token, "jodash.token", "value", {
          path: "/",
        });
        successNotification("Successful Login");
        navigate("/");
        break;

      default:
        errorNotification("Somenthing wrong, try again");
        break;
    }
  };

  const signUp = async () => {};

  const signOut = () => {};

  return (
    <Context.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </Context.Provider>
  );
}

export const useAccess = () => useContext(Context);
