import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import Loader from "../../../components/Loader/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import SellerProductCard from "./SellerProductCard/SellerProductCard";

const MyProducts = () => {
  useTitle("My Products");
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellerProducts", user.email],
    queryFn: async () => {
      const res = await fetch(
        `https://basement-of-books-server-side.vercel.app/sellerProducts/${user?.email}`,
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

  const handleDeleteProduct = (productData) => {
    setShowModal(false);
    setSelectedProduct(null);
    fetch(
      `https://basement-of-books-server-side.vercel.app/products/${productData._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`${productData.title} has been deleted.`);
        }
      });
  };

  const handleAdvertiseProduct = async (product) => {
    const res = await fetch(
      `https://basement-of-books-server-side.vercel.app/product/advertise/${product._id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success(`Successfully added ${product.title} in advertisement`);
      refetch();
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

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
            setShowModal={setShowModal}
            setSelectedProduct={setSelectedProduct}
            handleAdvertiseProduct={handleAdvertiseProduct}
          ></SellerProductCard>
        ))}
      </div>
      {showModal && (
        <ConfirmationModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalData={selectedProduct}
          title={"Are you sure you want to delete this product?"}
          successButtonName={"Delete"}
          successAction={handleDeleteProduct}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyProducts;
