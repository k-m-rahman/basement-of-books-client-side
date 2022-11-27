import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import Loader from "../../../components/Loader/Loader";
import TableRow from "./TableRow/TableRow";

const AllBuyers = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", "buyers"],
    queryFn: async () => {
      const res = await fetch(
        "https://basement-of-books-server-side.vercel.app/users/buyers",
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
  const handleDeleteBuyer = (buyer) => {
    setShowModal(false);
    setSelectedBuyer(null);
    fetch(
      `https://basement-of-books-server-side.vercel.app/users/${buyer._id}`,
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
          toast.success(`${buyer.name} has been deleted.`);
        }
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="px-5 pb-20">
      <h3 className="capitalize text-4xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100 my-5">
        All Buyers
      </h3>

      <Table>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Buyer Name</Table.HeadCell>
          <Table.HeadCell>Buyer Email</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {buyers.map((buyer) => (
            <TableRow
              key={buyer._id}
              buyer={buyer}
              setShowModal={setShowModal}
              setSelectedBuyer={setSelectedBuyer}
            ></TableRow>
          ))}
        </Table.Body>
      </Table>
      {showModal && (
        <ConfirmationModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalData={selectedBuyer}
          title={"Are you sure you want to delete this buyer?"}
          successButtonName={"Delete"}
          successAction={handleDeleteBuyer}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllBuyers;
