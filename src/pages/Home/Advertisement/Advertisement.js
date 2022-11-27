import { useQuery } from "@tanstack/react-query";
import React from "react";
import ImageGallery from "react-image-gallery";
import Lottie from "lottie-react";
import advertiseAnime from "../../../assets/advertise.json";

const Advertisement = () => {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertisedProducts"],
    queryFn: async () => {
      const res = await fetch(
        "https://basement-of-books-server-side.vercel.app/advertisedProducts"
      );
      const data = await res.json();
      return data;
    },
  });

  const images = products.map((product) => {
    return {
      original: product.image,
      description: `$${product.resalePrice}`,
    };
  });

  if (images.length > 0) {
    return (
      <div className="mt-10">
        <h3 className="capitalize text-3xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100 mb-4 lg:mb-8">
          Advertised Items
        </h3>
        <div className=" flex flex-col lg:flex-row gap-5 items-center justify-center">
          <div className=" w-10/12 lg:w-2/5">
            <Lottie animationData={advertiseAnime} loop={true}></Lottie>
          </div>
          <div className=" w-7/12 mx-auto lg:w-1/3 lg:mx-10">
            <ImageGallery showBullets={true} items={images} />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Advertisement;
