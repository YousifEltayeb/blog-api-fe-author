import { useEffect, useState } from "react";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const useComments = () => {
  const [comments, setComments] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetch(`${VITE_SERVER_URL}/comments`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          setError(response);
          return;
        }
        return response.json();
      })
      .then((response) => setComments(response.comments))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [token]);

  return { comments, error, loading };
};

export default useComments;
