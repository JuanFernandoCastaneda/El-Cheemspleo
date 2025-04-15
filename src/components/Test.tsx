import { useContext, useEffect, useState } from "react";
import { getUserInfo, registerUser } from "../db/user";
import { useSession } from "../context/AuthContext";

function Test() {
  const session = useSession();

  useEffect(() => {
    if (session) {
      const id = session.user.id
      getUserInfo(id).then((response) => {
        if (response?.length == 0) {
          //registerUser(id, "papas", "pupas")
        }
      });
    }
  }, [session]);
  return <p>a</p>;
}

export default Test;
