import { SignInProps } from "@/@types/userType";
import { api } from "./api";

export const accessApi = {
  signIn: async (data: SignInProps) => {
    return await api
      .post("/dashboard/signIn", data)
      .catch((err) => err.response);
  },
};
