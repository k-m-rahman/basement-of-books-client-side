import React from "react";
import { FaAngleRight } from "react-icons/fa";

const Category = ({ category }) => {
  const { title, image } = category;
  return (
    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
      <img
        className="object-cover w-full h-56 md:h-64 xl:h-80"
        src={image}
        alt=""
      />
      <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
        <p className="flex justify-center items-center gap-2 text-center font-semibold tracking-wide text-white">
          {title} <FaAngleRight></FaAngleRight>
        </p>
      </div>
    </div>
  );
};

export default Category;
