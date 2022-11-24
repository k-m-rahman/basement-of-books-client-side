import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Main";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../pages/Dashboard/AllSellers/AllSellers";
import MyBuyers from "../pages/Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../pages/Dashboard/ReportedItems/ReportedItems";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/myOrders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/myProducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/myBuyers",
        element: <MyBuyers></MyBuyers>,
      },
      {
        path: "/dashboard/allSellers",
        element: <AllSellers></AllSellers>,
      },
      {
        path: "/dashboard/allBuyers",
        element: <AllBuyers></AllBuyers>,
      },
      {
        path: "/dashboard/reportedItems",
        element: <ReportedItems></ReportedItems>,
      },
    ],
  },
]);
