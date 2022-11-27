import { Button, Carousel } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div className="h-60  sm:h-[450px]  rounded-none mx-2 lg:mx-4 ">
      <Carousel slideInterval={5000}>
        <div className="h-full bg-no-repeat  text-white bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')] flex justify-center items-center">
          <div className="text-center shadow-xl bg-black bg-opacity-50 p-10 rounded-lg">
            <h2
              className=" text-2xl md:text-4xl   lg:text-5xl font-bold  p-2 md:p-5 "
              style={{ textShadow: "2px 2px 5px violet" }}
            >
              Basement of Books...{" "}
            </h2>
            <p className="font-semibold  w-fit  mx-auto">
              A place that features titles and authors from around the world
            </p>
          </div>
        </div>
        <div className="h-full bg-no-repeat  text-white bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=785&q=80')] flex justify-center items-center">
          <div className="text-center shadow-xl bg-black bg-opacity-50 p-10 rounded-lg">
            <h2
              className=" text-2xl md:text-4xl   lg:text-5xl font-bold  p-2 md:p-5 "
              style={{ textShadow: "2px 2px 5px violet" }}
            >
              Basement of Books...{" "}
            </h2>
            <p className="font-semibold  w-fit  mx-auto">
              We believe in quality not quantity.
            </p>
          </div>
        </div>
        <div className="h-full bg-no-repeat  text-white bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1580192270066-bed2e3055024?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] flex justify-center items-center">
          <div className="text-center shadow-xl bg-black bg-opacity-50 p-10 rounded-lg">
            <h2
              className=" capitalize text-2xl md:text-4xl   lg:text-5xl font-bold  p-2 md:p-5 "
              style={{ textShadow: "2px 2px 5px violet" }}
            >
              Basement of Books...{" "}
            </h2>
            <p className="font-semibold  w-fit  mx-auto">
              Books never gets old, books only get better.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
