import { api } from "./api";

export const accessApi = {
  signIn: async () => {
    return await api.post("/user/signIn").catch((err) => err.response);
  },
  signUp: async () => {
    return await api.post("/user/signIn").catch((err) => err.response);
  },
};
