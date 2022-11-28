import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import Loader from "../../../components/Loader/Loader";
import useTitle from "../../../hooks/useTitle";
import TableRow from "./TableRow/TableRow";

const ReportedItems = () => {
  useTitle("Reported Items");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      const res = await fetch(
        "https://basement-of-books-server-side.vercel.app/reportedProducts",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteProduct = (product) => {
    console.log(product);
    setShowModal(false);
    setSelectedProduct(null);

    fetch(
      `https://basement-of-books-server-side.vercel.app/reportedProducts/${product._id}`,
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
          toast.success(`${product.title} has been deleted.`);
        }
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="px-5 pb-20">
      <h3 className="capitalize text-4xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100 my-5">
        Reported Items
      </h3>

      <Table>
        <Table.Head>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Seller Name</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products?.map((product) => (
            <TableRow
              key={product._id}
              product={product}
              setShowModal={setShowModal}
              setSelectedProduct={setSelectedProduct}
            ></TableRow>
          ))}
        </Table.Body>
      </Table>
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

export default ReportedItems;
