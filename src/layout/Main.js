import React from "react";
import { Outlet } from "react-router-dom";
import CommonFooter from "../pages/shared/Footer/CommonFooter";
import Header from "../pages/shared/Header/Header";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <CommonFooter></CommonFooter>
    </div>
  );
};

export default Main;
