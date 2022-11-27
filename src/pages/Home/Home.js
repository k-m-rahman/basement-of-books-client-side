import React from "react";
import useTitle from "../../hooks/useTitle";
import Advertisement from "./Advertisement/Advertisement";
import Categories from "./Categories/Categories";
import Intro from "./Intro/Intro";
import Slider from "./Slider/Slider";

const Home = () => {
  useTitle("Home");
  return (
    <div className="flex flex-col gap-5 md:gap-8 py-10">
      <Slider></Slider>
      <Advertisement></Advertisement>
      <Intro></Intro>
      <Categories></Categories>
    </div>
  );
};

export default Home;
