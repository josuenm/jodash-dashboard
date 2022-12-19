import { EditProductProps, LocalProductProps } from "@/@types/productType";
import { api } from "./api";

const token =
  "eyJhbGciOiJIUzI1NiJ9.N2NmZTVmODctYWRlMi00MjczLWIwYTctMTA5OGFmZTY4YzE0.k8jCoh-neYbDlloaY4RhaMKZI1xBPmQKUBX09d6KXFg";

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

    return await api
      .post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
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

    return await api
      .put(`/product/edit/${product.id}`, formData, {
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
