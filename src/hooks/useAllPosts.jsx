import { useEffect, useState, useContext, createContext } from "react";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const Context = createContext();

export const AllPostsDataProvider = ({ children }) => {
  const [posts, setPosts] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetch(`${VITE_SERVER_URL}/posts`, {
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
      .then((response) => setPosts(response))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <Context.Provider value={{ posts, error, loading }}>
      {children}
    </Context.Provider>
  );
};

export const useAllPosts = () => useContext(Context);
