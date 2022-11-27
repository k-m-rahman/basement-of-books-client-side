import { useEffect, useState } from "react";

const useVerifiedSeller = (email) => {
  const [verified, setVerified] = useState(false);
  const [isVerificationLoading, setIsVerificationLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/role/${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setVerified(data.role);
          setIsVerificationLoading(false);
        });
    }
  }, [email]);

  return [verified, isVerificationLoading];
};

export default useVerifiedSeller;
