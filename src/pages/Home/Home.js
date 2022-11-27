import React from "react";
import Advertisement from "./Advertisement/Advertisement";
import Categories from "./Categories/Categories";

const Home = () => {
  return (
    <div className="flex flex-col gap-10">
      <Advertisement></Advertisement>
      <Categories></Categories>
    </div>
  );
};

export default Home;
