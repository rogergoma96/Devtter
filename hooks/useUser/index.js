import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { onAuthStateChanged } from "../../firebase/client";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

const useUser = () => {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (user === USER_STATES.NOT_LOGGED) {
      router.push("/");
    }
  }, [user]);

  return user;
};

export default useUser;
