import { Spinner } from "flowbite-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <Spinner
        color="pink"
        aria-label="Extra large spinner example"
        size="xl"
      />
    </div>
  );
};

export default Loader;
