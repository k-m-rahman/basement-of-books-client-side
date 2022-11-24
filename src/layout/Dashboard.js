import { Sidebar } from "flowbite-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import CommonFooter from "../pages/shared/Footer/CommonFooter";
import Header from "../pages/shared/Header/Header";
import {
  FaShoppingBag,
  FaPlusSquare,
  FaBook,
  FaUser,
  FaUserTie,
  FaBookDead,
} from "react-icons/fa";

const Dashboard = () => {
  const listItemStyle = `p-1 px-2 lg:px-5 lg:py-2 rounded-lg hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700`;
  const sideBarMenus = (
    <>
      {/* my orders */}
      <li className={listItemStyle}>
        <Link to={`/dashboard/myOrders`}>
          {" "}
          <span className="flex items-center gap-1">
            <FaShoppingBag></FaShoppingBag> My Orders
          </span>
        </Link>
      </li>

      {/* add a product */}
      <li className={listItemStyle}>
        <Link to={`/dashboard/addProduct`}>
          {" "}
          <span className="flex items-center gap-1">
            <FaPlusSquare></FaPlusSquare> Add Product
          </span>
        </Link>
      </li>
      {/* My Products */}
      <li className={listItemStyle}>
        <Link to={`/dashboard/myProducts`}>
          {" "}
          <span className="flex items-center gap-1">
            <FaBook></FaBook> My Products
          </span>
        </Link>
      </li>
      {/* My Buyers */}
      <li className={listItemStyle}>
        <Link to={`/dashboard/myBuyers`}>
          {" "}
          <span className="flex items-center gap-1">
            <FaUser></FaUser> My Buyers
          </span>
        </Link>
      </li>
      {/* All Sellers */}
      <li className={listItemStyle}>
        <Link to={`/dashboard/allSellers`}>
          {" "}
          <span className="flex items-center gap-1">
            <FaUserTie></FaUserTie> All Sellers
          </span>
        </Link>
      </li>
      {/* All Buyers */}
      <li className={listItemStyle}>
        <Link to={`/dashboard/allBuyers`}>
          {" "}
          <span className="flex items-center gap-1">
            <FaUser></FaUser> All Buyers
          </span>
        </Link>
      </li>
      {/* Reported Items */}
      <li className={listItemStyle}>
        <Link to={`/dashboard/reportedItems`}>
          {" "}
          <span className="flex items-center gap-1">
            <FaBookDead></FaBookDead> Reported Items
          </span>
        </Link>
      </li>
    </>
  );
  return (
    <div className="dark:bg-slate-500">
      <Header></Header>
      <div className="w-full grid grid-cols-1 lg:grid-cols-10 ">
        {/* menus for little devices */}
        <div className="flex flex-wrap gap-2 justify-center my-3 list-none lg:hidden px-1">
          {sideBarMenus}
        </div>
        <Sidebar
          className="hidden lg:grid col-span-2"
          aria-label="Default sidebar example"
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>{sideBarMenus}</Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="text-center dark:text-white col-span-8 bg-slate-100 dark:bg-slate-600 py-5">
          <h2>Hello world</h2>
          <Outlet></Outlet>
        </div>
      </div>
      <CommonFooter></CommonFooter>
    </div>
  );
};

export default Dashboard;
