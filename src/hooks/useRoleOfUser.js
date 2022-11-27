import { useEffect, useState } from "react";

const useRoleOfUser = (email) => {
  const [role, setRole] = useState("");
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(
        `https://basement-of-books-server-side.vercel.app/users/role/${email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setRole(data.role);
          setIsRoleLoading(false);
        });
    }
  }, [email]);

  return [role, isRoleLoading];
};

export default useRoleOfUser;
