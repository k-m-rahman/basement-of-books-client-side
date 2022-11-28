import React from "react";
import CommonFooter from "../shared/Footer/CommonFooter";
import Header from "../shared/Header/Header";
import errorPic from "../../assets/error.png";
import { Link, useRouteError } from "react-router-dom";
import { Button } from "flowbite-react";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <Header></Header>
      <div className="dark:bg-slate-400 pb-20">
        <div className="  flex flex-col-reverse md:flex-row pt-5 justify-center items-center ">
          <img src={errorPic} className="w-2/3 md:w-1/5 " alt="" />
          <h3 className=" text-3xl md:text-5xl font-semibold dark:text-red-600">
            An error occurred...{" "}
          </h3>
        </div>

        {error && (
          <div className="my-5 text-center flex flex-col gap-3">
            <span className="text-9xl font-bold text-slate-700 dark:text-slate-800">
              {error?.status}
            </span>
            <span className="text-3xl font-semibold">{error?.statusText}</span>
          </div>
        )}
        <div className="flex justify-center items-center">
          <Link to={`/`}>
            <Button className="mx-auto bg-gradient-to-r from-pink-500 to-pink-700">
              Go to home
            </Button>
          </Link>
        </div>
      </div>
      <CommonFooter></CommonFooter>
    </div>
  );
};

export default ErrorPage;
