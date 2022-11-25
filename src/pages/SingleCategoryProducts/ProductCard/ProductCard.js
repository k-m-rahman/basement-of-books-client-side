import { Card } from "flowbite-react";
import React from "react";

const ProductCard = ({ product }) => {
  const { title, image, description } = product;
  return (
    <div className="mx-auto">
      <Card horizontal={true} imgSrc={image}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </Card>
    </div>
  );
};

export default ProductCard;
