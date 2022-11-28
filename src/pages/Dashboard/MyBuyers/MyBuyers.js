import React from "react";
import useTitle from "../../../hooks/useTitle";

const MyBuyers = () => {
  useTitle("My Buyers");
  return (
    <div>
      This is my buyers
      <h3 className="text-3xl">Coming Soon...</h3>
    </div>
  );
};

export default MyBuyers;
