import { usePost } from "../hooks/usePost.jsx";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { Button } from "@/components/ui/button";
import Skeleton from "./Skeleton.jsx";
import Markdown from "react-markdown";
import { MDXEditor } from "@mdxeditor/editor";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
function Posts() {
  const { post, error, loading } = usePost();
  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const navigate = useNavigate();
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
  const handleTogglePublish = () => {
    fetch(`${VITE_SERVER_URL}/posts/${post.id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: new URLSearchParams({
        postId: post.id,
        status: post.published ? false : true,
      }),
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Could not update status");
        }
      })
      .catch((err) => console.error(err));
  };
  const handleDelete = () => {
    fetch(`${VITE_SERVER_URL}/posts/${post.id}`, {
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
        navigate("/");
        navigate(0);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <main class="flex text-left  flex-1 p-8 ">
        <section class="p-4">
          <div class="inline-flex items-center gap-2">
            <label
              htmlFor="switch-component-on"
              class="text-slate-600 text-sm cursor-pointer"
            >
              Publish
            </label>

            <div class="relative inline-block w-11 h-5">
              <input
                defaultChecked={post.published}
                id="switch-component"
                type="checkbox"
                onChange={handleTogglePublish}
                class="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
              />
              <label
                htmlFor="switch-component-on"
                class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
              ></label>
            </div>
          </div>
          <button
            class="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-800 focus:shadow-none active:bg-red-800 hover:bg-red-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
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
          <Button onClick={handleEditTitle}>Edit title</Button>
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
          <Button onClick={handleEditContent}>Edit content</Button>
        </section>
        <section class="text-left p-4">
          <h1>Preview</h1>
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
export default Posts;
