import { EditProductProps, LocalProductProps } from "@/@types/productType";
import { parseCookies } from "nookies";
import { api } from "./api";

export const productApi = {
  createProduct: async (product: LocalProductProps) => {
    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("quantity", product.quantity.toString());
    formData.append("colors", JSON.stringify(product.colors));
    formData.append("categories", JSON.stringify(product.categories));

    product.pictures.forEach((picture) => {
      formData.append("files", picture, picture.name);
    });

    const cookies = parseCookies();

    return await api
      .post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${cookies["jodash.token"]}`,
        },
      })
      .catch((res) => res.response);
  },

  editProduct: async (product: EditProductProps) => {
    const formData = new FormData();

    formData.append("id", product.id);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("quantity", product.quantity.toString());
    formData.append("colors", JSON.stringify(product.colors));
    formData.append("categories", JSON.stringify(product.categories));
    formData.append("pictures", JSON.stringify(product.pictures));

    product.uploadedPictures.forEach((picture) => {
      formData.append("files", picture, picture.name);
    });

    const cookies = parseCookies();

    return await api
      .put(`/product/edit/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${cookies["jodash.token"]}`,
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
    const cookies = parseCookies();

    return await api
      .delete(`/product/delete/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${cookies["jodash.token"]}`,
        },
      })
      .catch((res) => res.response);
  },
};
