import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const [clientSecret, setClientSecret] = useState("");
  const { price, buyer, buyerEmail, _id, productId } = booking;

  useEffect(() => {
    fetch(`http://localhost:5000/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    setProcessing(true);

    // creating payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    // confirming payment method
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: buyer,
            email: buyerEmail,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    // after payment successful operations
    if (paymentIntent.status === "succeeded") {
      // creating the payment object
      const payment = {
        price,
        bookingId: _id,
        transactionId: paymentIntent.id,
        buyerEmail,
        productId,
      };

      fetch(`http://localhost:5000/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            swal(
              "Congratulations! Your payment was successful",
              `Your transaction id : ${paymentIntent.id}`,
              "success"
            );
          }
        });
    }
    setProcessing(false);
  };
  return (
    <>
      <form
        className="shadow-lg bg-slate-200 border border-slate-300 p-6 rounded-xl"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          className="mt-5 mx-auto "
          color="warning"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </Button>
      </form>
      {cardError && (
        <p className="text-red-500 text-sm mt-4 font-semibold">{cardError}</p>
      )}
    </>
  );
};

export default CheckoutForm;
