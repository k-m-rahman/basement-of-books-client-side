import { Button } from "flowbite-react";
import React, { useContext } from "react";
import Loader from "../../../components/Loader/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";
import useRoleOfUser from "../../../hooks/useRoleOfUser";

const ProductCard = ({ product, setShowModal, setSelectedProduct }) => {
  const { user } = useContext(AuthContext);
  const [role, isRoleLoading] = useRoleOfUser(user?.email);
  const {
    title,
    image,
    description,
    condition,
    date,
    location,
    originalPrice,
    resalePrice,
    sellerName,
    timeUsed,
    sellerEmail,
  } = product;
  let date2 = new Date(date);
  const handleBooking = () => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  return (
    <div className="mx-auto w-full">
      <div className="flex  flex-col md:flex-row gap-5 justify-center items-center md:justify-start md:items-start  p-3 dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200">
        <div className=" w-full md:w-1/3">
          <img className="border rounded-lg w-full h-72 " src={image} alt="" />
        </div>
        <div className="w-full md:w-2/3 ">
          <h5 className="text-2xl h-14 text-center md:text-start font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <div className="my-2 ">
            <p className="font-semibold text-center md:text-start text-gray-900 dark:text-white">
              Seller's Name: {sellerName}
            </p>

            <div className="text-sm mt-2">
              <p className=" text-center md:text-start font-semibold text-gray-900 dark:text-white mb-2">
                Post created on : {date2.toDateString()}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                Condition: {condition}
              </p>
              <p className="grid grid-cols-2 gap-2 font-semibold text-gray-900 dark:text-white">
                <span>
                  Original Price:{" "}
                  <span className="text-amber-500">${originalPrice}</span>{" "}
                </span>
                <span>
                  Resale Price:{" "}
                  <span className="text-amber-500">${resalePrice}</span>{" "}
                </span>
              </p>
              <p className="grid grid-cols-2 gap-2 font-semibold text-gray-900 dark:text-white">
                <span>Location: {location}</span>
                <span>Used: {timeUsed}</span>
              </p>
            </div>
          </div>
          <p className="font-normal md:h-16 md:shadow-sm md:border p-2 rounded md:overflow-auto italic text-sm text-gray-700 dark:text-gray-400">
            {description}
          </p>

          {isRoleLoading ? (
            <Loader></Loader>
          ) : (
            <div className="my-4 ">
              <Button
                onClick={handleBooking}
                disabled={role === "Buyer" ? false : true}
                className="mx-auto"
                color="purple"
              >
                Book Now
              </Button>
              {role !== "Buyer" && (
                <p className="text-gray-700 dark:text-white mt-2 text-xs">
                  To book this item please login with a buyer account
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
