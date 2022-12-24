import { SignInProps, SignUpProps } from "@/@types/userType";
import { accessApi } from "@/services/axios/accessApi";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalTools } from "./globalToolsContext";

interface ContextProps {
  signIn: (data: SignInProps) => Promise<void>;
  signUp: (data: SignUpProps) => Promise<void>;
  signOut: () => void;
}

interface ProviderProps {
  children: ReactNode | ReactNode[];
}

const Context = createContext({} as ContextProps);

export function AccessContextProvider({ children }: ProviderProps) {
  const navigate = useNavigate();

  const {
    successNotification,
    errorNotification,
    warningNotification,
    fetchLoadingScreen,
  } = useGlobalTools();

  const signIn = async (data: SignInProps) => {
    fetchLoadingScreen(true);
    const res = await accessApi.signIn(data);
    fetchLoadingScreen(false);

    switch (res.status) {
      case 200:
        setCookie(null, "jodash.token", res.data.token, {
          path: "/",
        });
        successNotification("Successful Login");
        navigate("/");
        break;

      case 401:
        errorNotification("Email or password is incorrect");
        break;

      default:
        errorNotification("Somenthing wrong, try again");
        break;
    }
  };

  const signUp = async (data: SignUpProps) => {
    fetchLoadingScreen(true);
    const res = await accessApi.signUp(data);
    fetchLoadingScreen(false);

    switch (res.status) {
      case 201:
        setCookie(null, "jodash.token", res.data.token, {
          path: "/",
        });
        successNotification("Successful Register");
        navigate("/");
        break;

      case 409:
        warningNotification("Account already exist");
        break;

      default:
        errorNotification("Somenthing wrong, try again");
        break;
    }
  };

  const signOut = () => {
    destroyCookie(null, "jodash.token");
    navigate("/signIn");
  };

  return (
    <Context.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </Context.Provider>
  );
}

export const useAccess = () => useContext(Context);
