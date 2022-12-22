import { SignInProps, SignUpProps } from "@/@types/userType";
import { api } from "./api";

export const accessApi = {
  signIn: async (data: SignInProps) => {
    return await api
      .post("/dashboard/signIn", data)
      .catch((err) => err.response);
  },
  signUp: async (data: SignUpProps) => {
    return await api
      .post("/dashboard/signUp", data)
      .catch((err) => err.response);
  },
};
