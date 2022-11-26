import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "flowbite-react";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyOrders = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user?.email}`,
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
              <Table.Row
                key={booking._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <img
                    src={booking.image}
                    className="w-20 h-20 rounded-lg min-w-[70px]"
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>{booking.product}</Table.Cell>

                <Table.Cell>${booking.price}</Table.Cell>
                <Table.Cell>
                  {!booking.paid && (
                    <Link to={`/dashboard/payment/${booking._id}`}>
                      <Button gradientMonochrome="info" size="sm">
                        Pay
                      </Button>
                    </Link>
                  )}
                  {booking.paid && (
                    <span className="bg-gradient-to-r from-green-400 to-green-600 py-2 px-3 rounded-lg text-white font-semibold">
                      Paid
                    </span>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MyOrders;
