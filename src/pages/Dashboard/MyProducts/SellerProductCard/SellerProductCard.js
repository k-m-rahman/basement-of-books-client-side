import { Button } from "flowbite-react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { RiAdvertisementFill } from "react-icons/ri";

const SellerProductCard = ({
  product,
  setShowModal,
  setSelectedProduct,
  handleAdvertiseProduct,
}) => {
  const { title, image, location, resalePrice, soldStatus, condition } =
    product;

  const handleDelete = () => {
    setShowModal(true);
    setSelectedProduct(product);
  };
  return (
    <div className="mx-auto w-full ">
      <div className="flex  flex-col md:flex-row gap-5 justify-center items-center md:justify-start md:items-start  p-3 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-lg border border-slate-300">
        <div className=" w-full md:w-1/3">
          <img
            className="border rounded-lg w-full h-72 md:h-56 "
            src={image}
            alt=""
          />
        </div>
        <div className="w-full md:w-2/3 ">
          <h5 className="text-xl h-14 text-center md:text-start font-bold tracking-tight text-gray-900 dark:text-white overflow-auto">
            {title}
          </h5>

          <div className="text-sm mt-2">
            <p className="md:text-start grid grid-cols-2 gap-2 font-semibold text-gray-900 dark:text-white">
              <span>
                Price: <span className="text-amber-500">${resalePrice}</span>{" "}
              </span>
              <span>Status: {soldStatus ? "Sold" : "Not Sold"}</span>
              <span>Condition: {condition}</span>
              <span>Location: {location}</span>
            </p>
            <div className="flex flex-col gap-3 my-5 w-1/2 mx-auto md:h-16">
              <Button
                onClick={handleDelete}
                size="sm"
                gradientMonochrome="failure"
              >
                {" "}
                <span className="text-black mx-2">
                  <AiFillDelete></AiFillDelete>
                </span>{" "}
                Delete
              </Button>
              {!soldStatus && (
                <Button
                  onClick={() => handleAdvertiseProduct(product)}
                  size="sm"
                  gradientDuoTone="purpleToBlue"
                  disabled={product?.advertised}
                >
                  <span className="text-black mx-2">
                    {" "}
                    <RiAdvertisementFill></RiAdvertisementFill>{" "}
                  </span>
                  {product?.advertised ? "Advertised" : "Advertise"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;
