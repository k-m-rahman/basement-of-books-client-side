import React, { useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import converter from "number-to-words";
import ProductCard from "../SingleCategoryProducts/ProductCard/ProductCard";
import BookingModal from "../SingleCategoryProducts/BookingModal/BookingModal";
import useTitle from "../../hooks/useTitle";
import Loader from "../../components/Loader/Loader";

const SearchedBooks = () => {
  useTitle("Searched Products");
  const products = useLoaderData();
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (navigation.state === "loading") {
    return <Loader></Loader>;
  }

  return (
    <div className="p-5 py-14">
      <h3 className="text-5xl font-bold text-amber-400 underline text-center py-7 capitalize">
        {products.length > 1
          ? `${converter.toWords(products.length)} products were found`
          : products.length === 1
          ? `One product was found`
          : `Zero product was found`}
      </h3>
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

export default SearchedBooks;
