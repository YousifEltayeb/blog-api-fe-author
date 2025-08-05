import { usePost } from "../hooks/usePost.jsx";
import Comments from "./Comments.jsx";
import Skeleton from "./Skeleton.jsx";
import Markdown from "react-markdown";
function Posts() {
  const { post, error, loading } = usePost();
  if (loading) {
    return <Skeleton />;
  }
  if (error) {
    if (error.status === 404) {
      return <>NOT FOUND</>;
    } else
      return (
        <>
          ERROR: <br />
          {error.statusText}
        </>
      );
  }
  return (
    <>
      <main class="text-left mb-auto px-32 p-8 border-b">
        <h1 class="text-4xl text-center m-8 p-8">{post.title}</h1>
        <article class="text-2xl">
          <Markdown>{post.content}</Markdown>
        </article>
      </main>
    </>
  );
}
export default Posts;
