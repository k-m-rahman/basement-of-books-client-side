import { useEffect, useState } from "react";

const useVerifiedSeller = (email) => {
  const [verified, setVerified] = useState(false);
  const [isVerificationLoading, setIsVerificationLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(
        `https://basement-of-books-server-side.vercel.app/users/verifiedSeller/${email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setVerified(data.verified);
          setIsVerificationLoading(false);
        });
    }
  }, [email]);

  return [verified, isVerificationLoading];
};

export default useVerifiedSeller;
