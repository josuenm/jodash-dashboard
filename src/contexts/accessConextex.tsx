import { SignInProps } from "@/@types/userType";
import { createContext, ReactNode, useContext } from "react";

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
  const signIn = async (data: SignInProps) => {};

  const signUp = async () => {};

  const signOut = () => {};

  return (
    <Context.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </Context.Provider>
  );
}

export const useAccess = () => useContext(Context);
