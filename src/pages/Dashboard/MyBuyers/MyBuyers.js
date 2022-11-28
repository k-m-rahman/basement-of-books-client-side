import React from "react";
import useTitle from "../../../hooks/useTitle";

const MyBuyers = () => {
  useTitle("My Buyers");
  return (
    <div className="py-20">
      This is my buyers
      <h3 className="text-3xl">Coming Soon...</h3>
    </div>
  );
};

export default MyBuyers;
