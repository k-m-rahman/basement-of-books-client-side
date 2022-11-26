import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import SellerProductCard from "./SellerProductCard/SellerProductCard";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: products = [] } = useQuery({
    queryKey: ["sellerProducts", user.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/sellerProducts/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
  });

  return (
    <div className="p-5 pb-20">
      <div className="mb-10 text-center px-4">
        <h3 className="capitalize text-4xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100 italic underline">
          My Products
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {products.map((product) => (
          <SellerProductCard
            key={product._id}
            product={product}
            // setShowModal={setShowModal}
            // setSelectedProduct={setSelectedProduct}
          ></SellerProductCard>
        ))}
      </div>
      {/* {showModal && (
    <BookingModal
      showModal={showModal}
      setShowModal={setShowModal}
      selectedProduct={selectedProduct}
    ></BookingModal>
  )} */}
    </div>
  );
};

export default MyProducts;
