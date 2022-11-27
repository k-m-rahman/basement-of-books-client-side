import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import useTitle from "../../../hooks/useTitle";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_PK_TEST);

const Payment = () => {
  useTitle("Payment");
  const booking = useLoaderData();
  const navigation = useNavigation();

  const { product, price } = booking;

  if (navigation.state === "loading") {
    return <Loader></Loader>;
  }

  return (
    <div className="py-10 flex flex-col gap-5">
      <h3 className=" text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-100 px-3">
        Please pay <span className="text-amber-500">${price}</span> for{" "}
        <span className="italic block md:inline">{product}</span>
      </h3>

      <div className="my-10 md:w-1/2  md:mx-auto mx-4">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
