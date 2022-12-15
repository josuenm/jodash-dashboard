import { api } from "./api";

export const customerApi = {
  getSales: async () => {
    return await api.get("/dashboard/sales").catch((err) => err.response);
  },
};
