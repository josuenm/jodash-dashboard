import { LocalProductProps } from "@/@types/productType";
import { api } from "./api";

const token =
  "eyJhbGciOiJIUzI1NiJ9.N2NmZTVmODctYWRlMi00MjczLWIwYTctMTA5OGFmZTY4YzE0.k8jCoh-neYbDlloaY4RhaMKZI1xBPmQKUBX09d6KXFg";

export const productApi = {
  createProduct: async ({
    title,
    description,
    price,
    quantity,
    colors,
    categories,
    pictures,
  }: LocalProductProps) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());
    formData.append("colors", JSON.stringify(colors));
    formData.append("categories", JSON.stringify(categories));

    pictures.forEach((picture) => {
      formData.append("files", picture, picture.name);
    });

    return await api
      .post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .catch((res) => res.response);
  },

  getProductById: async (id: string) => {
    return await api.get(`/product/find/${id}`).catch((res) => res.response);
  },

  getAllProducts: async () => {
    return await api.get("/product/listAll").catch((res) => res.response);
  },

  deleteOneProduct: async (id: string) => {
    return await api
      .delete(`/product/delete/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .catch((res) => res.response);
  },
};
