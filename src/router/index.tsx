import { Sidemenu } from "@/layouts/sidemenu";
import Customers from "@/views/customers";
import Dashboard from "@/views/dashboard";
import Products from "@/views/products";
import AddProduct from "@/views/products/addProduct";
import EditProduct from "@/views/products/edit";
import Product from "@/views/products/product";
import SignIn from "@/views/signin";
import SignUp from "@/views/signup";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

interface RouteProps {
  path: string;
  element: JSX.Element;
}

export default function Routes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const normalRoutes = [
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

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
        {
          path: "/products/edit/:id",
          element: <EditProduct />,
        },
      ],
    },
  ];

  useEffect(() => {
    const cookies = parseCookies();

    if (
      !cookies["jodash.token"] &&
      authRoutes[0].children.some((item) => item.path === pathname)
    ) {
      navigate("/signin");
    }
  }, []);

  const routes: RouteProps[] = [...authRoutes, ...normalRoutes];
  return useRoutes(routes);
}
