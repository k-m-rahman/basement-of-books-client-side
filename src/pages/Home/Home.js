import React from "react";
import useTitle from "../../hooks/useTitle";
import Advertisement from "./Advertisement/Advertisement";
import Categories from "./Categories/Categories";
import Slider from "./Slider/Slider";

const Home = () => {
  useTitle("Home");
  return (
    <div className="flex flex-col gap-10 py-10">
      <Slider></Slider>
      <Advertisement></Advertisement>
      <Categories></Categories>
    </div>
  );
};

export default Home;
