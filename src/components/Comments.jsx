const Comments = ({ comments }) => {
  if (comments.length === 0) {
    return <span>No comments yet :(</span>;
  }
  return (
    <>
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
          </div>
        );
      })}
    </>
  );
};
export default Comments;
