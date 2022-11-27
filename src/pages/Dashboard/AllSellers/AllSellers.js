import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import React from "react";
import Loader from "../../../components/Loader/Loader";
import TableRow from "./TableRow/TableRow";

const AllSellers = () => {
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", "sellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users/sellers", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

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
            <TableRow key={seller._id} seller={seller}></TableRow>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AllSellers;
