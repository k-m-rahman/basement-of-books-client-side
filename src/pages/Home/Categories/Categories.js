import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import Category from "./Category/Category";

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:5000/categories").then((response) => {
      setCategories(response.data);
      setCategoriesLoading(false);
    });
  }, []);

  if (categoriesLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="my-5 text-center flex flex-col gap-4 px-4">
        <h3 className="capitalize text-4xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100">
          Categories
        </h3>
        <p className="  text-slate-500 dark:text-slate-200 ">
          These are the categories of our collection of used books. Collect the
          suitable one for for your satisfaction
        </p>
      </div>
      <div className="">
        <div className="relative px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
          {/* <div className="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
            <svg
              viewBox="0 0 88 88"
              className="w-full max-w-screen-xl text-gray-800"
            >
              <circle
                fill="currentColor"
                fillOpacity="0.4"
                cx="44"
                cy="44"
                r="15.5"
              />
              <circle
                fillOpacity="0.1"
                fill="currentColor"
                cx="44"
                cy="44"
                r="44"
              />
              <circle
                fillOpacity="0.1"
                fill="currentColor"
                cx="44"
                cy="44"
                r="37.5"
              />
              <circle
                fillOpacity="0.1"
                fill="currentColor"
                cx="44"
                cy="44"
                r="29.5"
              />
              <circle
                fillOpacity="0.1"
                fill="currentColor"
                cx="44"
                cy="44"
                r="22.5"
              />
            </svg>
          </div> */}

          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories?.map((category) => (
              <Link key={category._id} to={`/category/${category._id}`}>
                <Category category={category}></Category>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
