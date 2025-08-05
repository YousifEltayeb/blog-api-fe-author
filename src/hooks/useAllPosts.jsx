import { useEffect, useState, useContext, createContext } from "react";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const Context = createContext();

export const AllPostsDataProvider = ({ children }) => {
  const [posts, setPosts] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${VITE_SERVER_URL}/posts`, { method: "GET", mode: "cors" })
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
  }, []);

  return (
    <Context.Provider value={{ posts, error, loading }}>
      {children}
    </Context.Provider>
  );
};

export const useAllPosts = () => useContext(Context);
