import { useQuery } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import TableRow from "./TabelRow/TableRow";

const MyOrders = () => {
  useTitle("My Orders");
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://basement-of-books-server-side.vercel.app/bookings?email=${user?.email}`,
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
  console.log(bookings);
  if (isLoading) {
    return <Loader></Loader>;
  }

  if (bookings.message === "forbidden access") {
    logout()
      .then(() => {})
      .catch((error) => console.error(error));
    return (
      <h2 className="text-3xl font-semibold my-5">
        Please{" "}
        <Link className="text-sky-400" to={`/login`} state={{ from: location }}>
          login
        </Link>{" "}
        again to see your appointments
      </h2>
    );
  }

  return (
    <div className="pb-20">
      <h3 className="capitalize text-4xl md:text-5xl font-semibold text-slate-700 dark:text-slate-100 my-5">
        My Orders
      </h3>
      <div className="p-5">
        <Table>
          <Table.Head>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>Product</Table.HeadCell>

            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Payment</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {bookings.map((booking) => (
              <TableRow key={booking._id} booking={booking}></TableRow>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MyOrders;
