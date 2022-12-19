import {
  EditProductProps,
  LocalProductProps,
  ProductProps,
} from "@/@types/productType";
import { productApi } from "@/services/axios/productApi";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalTools } from "./globalToolsContext";

interface ProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

interface ContextProps {
  createProduct: (data: LocalProductProps) => Promise<void>;
  editProduct: (data: EditProductProps) => Promise<void>;
  getProductById: (id: string) => Promise<ProductProps | void>;
  getAllProducts: () => Promise<ProductProps[]>;
  deleteProduct: (id: string) => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = createContext({} as ContextProps);

export function ProductContextProvider({ children }: ProviderProps) {
  const { successNotification, errorNotification } = useGlobalTools();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const createProduct = async (data: LocalProductProps) => {
    setIsLoading(true);
    const res = await productApi.createProduct(data);
    setIsLoading(false);

    switch (res.status) {
      case 201:
        successNotification("Product created successfully");
        navigate(`/products/${res.data.id}`);
        break;

      case 401:
        errorNotification("You don't have admin permissions");
        break;

      default:
        errorNotification("Something wrong, try again");
        break;
    }
  };

  const editProduct = async (data: EditProductProps) => {
    setIsLoading(true);
    const res = await productApi.editProduct(data);
    setIsLoading(false);

    switch (res.status) {
      case 200:
        successNotification("Product updated successfully");
        navigate(`/products/${res.data.id}`);
        break;

      default:
        errorNotification("Something wrong, try again");
        break;
    }
  };

  const getProductById = async (id: string) => {
    setIsLoading(true);
    const res = await productApi.getProductById(id);
    setIsLoading(false);

    switch (res.status) {
      case 200:
        return res.data;

      default:
        errorNotification("Something wrong, redirecting to products page");
        navigate("/products");
        break;
    }
  };

  const getAllProducts = async () => {
    setIsLoading(true);
    const res = await productApi.getAllProducts();
    setIsLoading(false);

    switch (res.status) {
      case 200:
        return res.data;

      default:
        errorNotification("Something wrong trying to list products");
        return [];
    }
  };

  const deleteProduct = async (id: string) => {
    setIsLoading(true);
    const res = await productApi.deleteOneProduct(id);
    setIsLoading(false);

    switch (res.status) {
      case 204:
        successNotification("Product deleted successfully");
        navigate("/products");
        break;

      default:
        errorNotification("Something wrong, try again");
        break;
    }
  };

  return (
    <Context.Provider
      value={{
        createProduct,
        editProduct,
        getProductById,
        getAllProducts,
        deleteProduct,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useProduct = () => useContext(Context);
