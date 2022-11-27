import React from "react";
import bookAnime from "../../../assets/books.json";
import Lottie from "lottie-react";

const Intro = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  my-20">
        <div className=" p-5 md:pl-20 text-center md:text-start flex flex-col justify-center">
          <p className="text-pink-800 dark:text-amber-500 font-bold pb-3">
            ABOUT BASEMENT OF BOOKS
          </p>
          <h2 className="capitalize text-3xl md:text-4xl font-semibold text-slate-700 dark:text-slate-100 ">
            We want you to love our books as much as we do.
          </h2>
          <h5 className="text-xl my-5 text-slate-500 font-semibold dark:text-slate-200">
            At Basement of Books, you can buy and sell your used books very
            easily. Our range of books is second to none.
          </h5>
          <p className=" text-slate-500 dark:text-slate-200">
            We take great pride in arranging titles from well-known and indie
            authors alike. Our mission is to get buyer/seller of all ages
            reading, helping them enhance their education skills. Let’s explore
            the wonderful world of literature together.
          </p>
        </div>
        <div className=" w-3/4 mx-auto md:w-3/5">
          <Lottie animationData={bookAnime} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Intro;
