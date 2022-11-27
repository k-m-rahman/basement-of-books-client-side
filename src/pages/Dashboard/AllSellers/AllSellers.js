import { useQuery } from "@tanstack/react-query";
import { Spinner, Table } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import Loader from "../../../components/Loader/Loader";
import TableRow from "./TableRow/TableRow";

const AllSellers = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", "sellers"],
    queryFn: async () => {
      const res = await fetch(
        "https://basement-of-books-server-side.vercel.app/users/sellers",
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

  // deleting a seller
  const handleDeleteSeller = (seller) => {
    setShowModal(false);
    setSelectedSeller(null);
    fetch(
      `https://basement-of-books-server-side.vercel.app/users/sellers/${seller._id}`,
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
          toast.success(`${seller.name} has been deleted.`);
        }
      });
  };

  // verifying a seller
  const handleVerifySeller = (seller) => {
    console.log(seller);

    fetch(
      `https://basement-of-books-server-side.vercel.app/users/sellers/${seller._id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success(`${seller.name} is verified successfully!`);
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="px-5 pb-20">
      <h3 className="capitalize text-4xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100 my-5">
        All Sellers
      </h3>

      <Table>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Seller Name</Table.HeadCell>
          <Table.HeadCell>Seller Email</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {sellers.map((seller) => (
            <TableRow
              key={seller._id}
              seller={seller}
              setShowModal={setShowModal}
              setSelectedSeller={setSelectedSeller}
              handleVerifySeller={handleVerifySeller}
            ></TableRow>
          ))}
        </Table.Body>
      </Table>
      {showModal && (
        <ConfirmationModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalData={selectedSeller}
          title={"Are you sure you want to delete this seller?"}
          successButtonName={"Delete"}
          successAction={handleDeleteSeller}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllSellers;
