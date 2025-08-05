import { usePost } from "../hooks/usePost.jsx";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { Button } from "@/components/ui/button";
import Comments from "./Comments.jsx";
import Skeleton from "./Skeleton.jsx";
import Markdown from "react-markdown";
import { MDXEditor } from "@mdxeditor/editor";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  CreateLink,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState } from "react";
function Posts() {
  const { post, error, loading } = usePost();
  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const token = window.localStorage.getItem("token");
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
  const handleEditTitle = () => {
    if (title) {
      fetch(`${VITE_SERVER_URL}/posts/${post.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: new URLSearchParams({ postId: post.id, title }),
      })
        .then(() => {
          alert("Title updated successfully");
        })
        .catch((err) => console.error(err))
        .finally(() => window.location.reload());
    }
  };
  const handleEditContent = () => {
    if (content) {
      fetch(`${VITE_SERVER_URL}/posts/${post.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: new URLSearchParams({ postId: post.id, content }),
      })
        .then(() => {
          alert("Content updated successfully");
        })
        .catch((err) => console.error(err))
        .finally(() => window.location.reload());
    }
  };
  return (
    <>
      <main class="text-left mb-auto px-32 p-8 border-b">
        <Button onClick={handleEditTitle}>Edit title</Button>
        <MDXEditor
          markdown={post.title}
          onChange={setTitle}
          plugins={[
            headingsPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BlockTypeSelect />
                  <BoldItalicUnderlineToggles />,
                  <CreateLink />,
                </>
              ),
            }),
          ]}
        />
        <Button onClick={handleEditContent}>Edit content</Button>
        <article>
          <MDXEditor
            markdown={post.content}
            onChange={setContent}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <BlockTypeSelect />
                    <BoldItalicUnderlineToggles />,
                    <CreateLink />,
                  </>
                ),
              }),
            ]}
          />
        </article>
      </main>
      <section class="text-left">
        <h1>Preview</h1>
        <h2>Title:</h2>
        <Markdown>{title ? title : "Edit title to view changes"}</Markdown>
        <h2>Content:</h2>
        <Markdown>
          {content ? content : "Edit content to view changes"}
        </Markdown>
      </section>
    </>
  );
}
export default Posts;
