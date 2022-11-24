import React from "react";

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
        <p className=" text-center font-semibold tracking-wide text-white">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Category;
