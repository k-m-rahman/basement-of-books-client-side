import React, { useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useTitle from "../../hooks/useTitle";
import BookingModal from "./BookingModal/BookingModal";
import ProductCard from "./ProductCard/ProductCard";
import Typewriter from "typewriter-effect";

const SingleCategoryProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const data = useLoaderData();
  const navigation = useNavigation();

  const { category, products } = data;
  useTitle(`${category.title}`);

  console.log(navigation);
  if (navigation.state === "loading") {
    return <Loader></Loader>;
  }

  return (
    <div className="p-5">
      <div className="my-5 text-center flex flex-col gap-4 px-4 ">
        <div className="flex gap-5 mx-auto items-center">
          <h3 className="capitalize text-4xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100 italic underline">
            <Typewriter
              options={{
                strings: [`${category.title}`],
                autoStart: true,
                loop: true,
              }}
            />
          </h3>
          <img
            className="w-16 h-16 md:w-20 md:h-20"
            src={category?.thumbnail}
            alt=""
          />
        </div>
        <p className="  text-slate-500 dark:text-slate-200 lg:w-2/3 mx-auto">
          {category.description}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            setShowModal={setShowModal}
            setSelectedProduct={setSelectedProduct}
          ></ProductCard>
        ))}
      </div>
      {showModal && (
        <BookingModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedProduct={selectedProduct}
        ></BookingModal>
      )}
    </div>
  );
};

export default SingleCategoryProducts;
