import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import {
  About,
  Checkout,
  DashboardProductos,
  Home,
  Login,
  Order,
  Orders,
  Phone,
  PhoneDetail,
  Register,
  ThankYou,
} from "../pages";
import { ClientLayout } from "../layouts/ClientLayout";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "celulares",
        element: <Phone />,
      },
      {
        path: "/celulares/:slug",
        element: <PhoneDetail />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "account",
        element: <ClientLayout />,
        children: [
          {
            path: "",
            element: <Navigate to={"/account/pedidos"} />,
          },
          {
            path: "pedidos",
            element: <Orders />,
          },
          {
            path: "pedidos/:id",
            element: <Order />,
          },
        ],
      },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/checkout/:id/thank-you",
    element: <ThankYou />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"/dashboard/productos"} />,
      },
      {
        path: "productos",
        element: <DashboardProductos />,
      },
    ],
  },
]);
