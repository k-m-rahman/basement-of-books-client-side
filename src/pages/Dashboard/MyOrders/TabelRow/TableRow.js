import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";

const TableRow = ({ booking }) => {
  const { data: product = null, isLoading } = useQuery({
    queryKey: ["products", booking?.productId],
    queryFn: async () => {
      const res = await fetch(
        `https://basement-of-books-server-side.vercel.app/products?productId=${booking.productId}`,
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
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>
        <img
          src={booking.image}
          className="w-20 h-20 rounded-lg min-w-[70px]"
          alt=""
        />
      </Table.Cell>
      <Table.Cell>{booking.product}</Table.Cell>

      <Table.Cell>${booking.price}</Table.Cell>

      {/* pay or paid or not available  */}
      <Table.Cell>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <>
            {product.soldStatus && !booking.paid && (
              <span className="bg-gradient-to-r from-red-400 to-red-600 py-2 px-3 rounded-lg text-white font-semibold">
                Not Available
              </span>
            )}
            {!product.soldStatus && !booking.paid && (
              <Link to={`/dashboard/payment/${booking._id}`}>
                <Button gradientMonochrome="info" size="sm">
                  Pay
                </Button>
              </Link>
            )}
            {product.soldStatus && booking.paid && (
              <span className="bg-gradient-to-r from-green-400 to-green-600 py-2 px-3 rounded-lg text-white font-semibold">
                Paid
              </span>
            )}
          </>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default TableRow;
