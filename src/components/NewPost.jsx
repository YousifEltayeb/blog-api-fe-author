const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { Button } from "@/components/ui/button";
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
import { useNavigate } from "react-router";
function NewPost() {
  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const handleNewPost = () => {
    if (title && content) {
      fetch(`${VITE_SERVER_URL}/posts`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: new URLSearchParams({ title, content }),
      })
        .then(() => {
          alert("Post created successfully");
        })
        .catch((err) => console.error(err))
        .finally(() => navigate("/"));
    }
  };
  return (
    <>
      <main class="flex flex-1 min-w-full  text-left p-8 border-b">
        <section class="flex-1 p-4">
          <MDXEditor
            markdown="New title here"
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
          <MDXEditor
            markdown="New content here"
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
          <Button onClick={handleNewPost}>Create post</Button>
        </section>
        <section class="flex-1 p-4">
          <h2>Title:</h2>
          <Markdown>{title ? title : "Edit title to view changes"}</Markdown>
          <h2>Content:</h2>
          <Markdown>
            {content ? content : "Edit content to view changes"}
          </Markdown>
        </section>
      </main>
    </>
  );
}
export default NewPost;
