import { useAllPosts } from "../hooks/useAllPosts.jsx";
import { Link } from "react-router";
import Skeleton from "./Skeleton.jsx";
import { useLogin } from "../hooks/useLogin.jsx";
import Login from "../components/Login.jsx";
function Home() {
  const { isLoggedIn } = useLogin();
  const { posts, error, loading } = useAllPosts();
  if (loading) {
    return <Skeleton />;
  }
  if (error) {
    console.error(error);
    return (
      <>
        ERROR: <br />
        {error.status}
      </>
    );
  }
  return (
    <main class="min-h-full m-auto text-left ">
      {!isLoggedIn ? (
        <Login />
      ) : (
        posts.map((post) => {
          return (
            <li key={post.id} class="mb-12 list-none">
              <Link
                class="text-3xl font-bold hover:underline"
                to={`/posts/${post.id}`}
              >
                {post.title}
              </Link>{" "}
              <br />
            </li>
          );
        })
      )}
    </main>
  );
}
export default Home;
