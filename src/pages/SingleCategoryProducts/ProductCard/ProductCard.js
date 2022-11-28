import { Button, Spinner } from "flowbite-react";
import React, { useContext } from "react";
import Loader from "../../../components/Loader/Loader";
import { AuthContext } from "../../../contexts/AuthProvider";
import useRoleOfUser from "../../../hooks/useRoleOfUser";
import useVerifiedSeller from "../../../hooks/useVerfiedSeller";
import verifiedIcon from "../../../assets/icons/verified.png";
import toast from "react-hot-toast";

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

  const [verified, isVerificationLoading] = useVerifiedSeller(sellerEmail);

  let date2 = new Date(date);
  const handleBooking = () => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleReport = () => {
    fetch(
      `https://basement-of-books-server-side.vercel.app/products/reportToAdmin/${product._id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Successfully reported to the admin`);
        }
      });
  };
  return (
    <div className="mx-auto w-full ">
      <div className="flex  flex-col md:flex-row gap-5 justify-center items-center md:justify-start md:items-start  p-3 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg border border-slate-300">
        <div className=" w-full md:w-1/3">
          <img className="border rounded-lg w-full h-72 " src={image} alt="" />
        </div>
        <div className="w-full md:w-2/3 ">
          <h5 className="text-2xl h-14 text-center md:text-start font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <div className="my-2 ">
            <p className="font-semibold text-center md:text-start text-gray-900 dark:text-white">
              <span className="flex justify-start gap-2 items-center">
                <span>Seller: {sellerName}</span>
                {isVerificationLoading ? (
                  <Spinner size="xs" color="pink"></Spinner>
                ) : verified ? (
                  <img className="w-4 h-4" src={verifiedIcon} alt=""></img>
                ) : (
                  <span className="text-xs text-red-500">Not Verified</span>
                )}
              </span>
            </p>

            <div className="text-sm mt-2">
              <p className=" text-start font-semibold text-gray-900 dark:text-white mb-2">
                Post created on : {date2.toDateString()}
              </p>
              <p className="font-semibold text-start  text-gray-900 dark:text-white">
                Condition: {condition}
              </p>
              <p className=" mt-3 text-start grid grid-cols-2 gap-2 font-semibold text-gray-900 dark:text-white">
                <span>
                  Original Price:{" "}
                  <span className="text-amber-500">${originalPrice}</span>{" "}
                </span>
                <span>
                  Resale Price:{" "}
                  <span className="text-amber-500">${resalePrice}</span>{" "}
                </span>
              </p>
              <p className="text-start grid grid-cols-2 gap-2 font-semibold text-gray-900 dark:text-white">
                <span>Location: {location}</span>
                <span>Used: {timeUsed}</span>
              </p>
            </div>
          </div>
          <p className="font-normal md:h-16 md:shadow-sm md:border pt-2 md:p-2 rounded md:overflow-auto italic text-sm text-gray-700 dark:text-gray-400 text-center ">
            {description}
          </p>

          {isRoleLoading ? (
            <Loader></Loader>
          ) : (
            <>
              <div className="my-4 flex justify-center gap-3">
                <Button
                  onClick={handleBooking}
                  disabled={role === "Buyer" ? false : true}
                  color="purple"
                >
                  Book Now
                </Button>
                <Button
                  onClick={handleReport}
                  color="warning"
                  disabled={role === "Buyer" ? false : true}
                >
                  Report
                </Button>
              </div>
              {role !== "Buyer" && (
                <p className="text-gray-700 dark:text-white mt-2 text-xs ">
                  To book or report this item please login with a buyer account
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
