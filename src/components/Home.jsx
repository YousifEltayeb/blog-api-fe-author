import { useAllPosts } from "../hooks/useAllPosts.jsx";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import Skeleton from "./Skeleton.jsx";
import { useLogin } from "../hooks/useLogin.jsx";
import Login from "../components/Login.jsx";
function Home() {
  const { isLoggedIn } = useLogin();
  const { posts, error, loading } = useAllPosts();
  const navigate = useNavigate();
  if (loading || isLoggedIn === undefined) {
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
  const handleNewPost = () => {
    navigate("/new-post");
  };
  return (
    <main class=" min-h-full m-auto text-left ">
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <div class="text-center mb-8 p-4">
            <Button onClick={handleNewPost}>New Post</Button>
          </div>
          {posts.map((post) => {
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
          })}
        </>
      )}
    </main>
  );
}
export default Home;
