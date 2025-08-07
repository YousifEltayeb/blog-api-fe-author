import { useNavigate } from "react-router";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const token = window.localStorage.getItem("token");
import Skeleton from "./Skeleton.jsx";
import useComments from "../hooks/useComments.jsx";
const Comments = () => {
  const { comments, error, loading } = useComments();
  const navigate = useNavigate();
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
  const handleDelete = (commentId) => {
    fetch(`${VITE_SERVER_URL}/comments/${commentId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Could not update status");
        }
      })
      .then(() => {
        navigate("./");
        navigate(0);
      })
      .catch((err) => console.error(err));
  };
  return (
    <main class="text-left min-w-full">
      {comments.map((comment) => {
        const dateObj = new Date(comment.createdAt);
        const date = dateObj.toLocaleDateString("en-GB");
        return (
          <div class="p-4 text-left" key={comment.id}>
            <div class="flex justify-between border-b ">
              <span>{comment.name} </span>
              <span class="ml-auto">{date}</span>
            </div>
            <p>{comment.content}</p>
            <button
              class="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-800 focus:shadow-none active:bg-red-800 hover:bg-red-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
              type="button"
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </main>
  );
};
export default Comments;
