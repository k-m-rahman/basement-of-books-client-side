import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard/ProductCard";

const SingleCategoryProducts = () => {
  const data = useLoaderData();
  console.log(data);
  const { category, products } = data;
  return (
    <div className="p-5">
      <div className="my-5 text-center flex flex-col gap-4 px-4">
        <h3 className="capitalize text-4xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100">
          {category.title}
        </h3>
        <p className="  text-slate-500 dark:text-slate-200 lg:w-2/3 mx-auto">
          {category.description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default SingleCategoryProducts;
