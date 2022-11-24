import React, { useContext } from "react";
import Loader from "../components/Loader/Loader";
// import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useRoleOfUser from "../hooks/useRoleOfUser";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  //   const location = useLocation();

  const [role, isRoleLoading] = useRoleOfUser(user?.email);

  if (loading || isRoleLoading) {
    return <Loader></Loader>;
  }

  if (user && role === "Buyer") {
    return children;
  }
  //   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  return (
    <h2 className="text-4xl text-red-500 text-center mt-5">
      You are not a buyer..Please login with a buyer profile
    </h2>
  );
};

export default BuyerRoute;
