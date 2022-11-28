import React from "react";
import useTitle from "../../hooks/useTitle";
import PrototypicalInheritance from "./PrototypicalInheritance/PrototypicalInheritance";
import ReactState from "./ReactState/ReactState";
import ReactVsAngulaVsVue from "./ReactVsAngulaVsVue/ReactVsAngulaVsVue";
import UnitTesting from "./UnitTesting/UnitTesting";

const Blogs = () => {
  useTitle("Blogs");
  return (
    <div>
      <h3 className="text-4xl text-center md:text-5xl dark:text-white capitalize font-bold  w-fit mx-auto p-2 rounded">
        Blogs
      </h3>

      <ReactState></ReactState>
      <PrototypicalInheritance></PrototypicalInheritance>
      <UnitTesting></UnitTesting>
      <ReactVsAngulaVsVue></ReactVsAngulaVsVue>
    </div>
  );
};

export default Blogs;
