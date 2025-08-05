import { useEffect, useState } from "react";
import { useParams } from "react-router";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const usePost = () => {
  const [post, setPost] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  useEffect(() => {
    fetch(`${VITE_SERVER_URL}/posts/${postId}`, { method: "GET", mode: "cors" })
      .then((response) => {
        if (response.status !== 200) {
          setError(response);
          return;
        }
        return response.json();
      })
      .then((response) => setPost(response))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [postId]);
  return { post, error, loading };
};
