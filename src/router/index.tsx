import { Sidemenu } from "@/layouts/sidemenu";
import Customers from "@/views/customers";
import Dashboard from "@/views/dashboard";
import Products from "@/views/products";
import AddProduct from "@/views/products/addProduct";
import Product from "@/views/products/product";
import { useRoutes } from "react-router-dom";

interface RouteProps {
  path: string;
  element: JSX.Element;
}

export default function Routes() {
  const authRoutes = [
    {
      path: "/",
      element: <Sidemenu />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/add",
          element: <AddProduct />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
      ],
    },
  ];

  const routes: RouteProps[] = [...authRoutes];

  return useRoutes(routes);
}
