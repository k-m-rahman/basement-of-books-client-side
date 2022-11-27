import React from "react";
import taxAnimation from "../../../assets/tax.json";
import Lottie from "lottie-react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  my-20">
        <div className=" p-5 md:pl-20 text-center md:text-start flex flex-col justify-center">
          <h2 className="capitalize text-4xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100 ">
            I make taxes easy
          </h2>
          <h5 className="text-xl my-5 text-slate-500 dark:text-slate-200">
            Bring me your files and I wll get your taxes squared away without
            the headaches.
          </h5>
          <p className="font-semibold text-slate-500 dark:text-slate-200">
            With me on your side, you don't need to stress about taxes any
            longer! I will find the deductions you missed and make sure every
            detail of your return is correct. Focus on the important things, not
            your tax returns.
          </p>
          <div className="flex justify-center items-center">
            <Link to="/contactMe">
              <Button className="w-fit mx-auto my-5"> Contact Me</Button>
            </Link>
          </div>
        </div>
        <div className=" w-3/4 mx-auto md:w-3/5">
          <Lottie animationData={taxAnimation} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Intro;
