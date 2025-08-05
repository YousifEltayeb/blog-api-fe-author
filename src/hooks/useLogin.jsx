import { useEffect, useState } from "react";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      fetch(`${VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            setIsLoggedIn(false);
            return;
          }
          return response.json();
        })
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else setIsLoggedIn(false);
  }, [token, isLoggedIn]);
  return { isLoggedIn };
};
