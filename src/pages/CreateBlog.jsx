import { useState } from "react";
import api from "../api";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to create a blog.");
      return;
    }

    api.post(
      "/blog",
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,   // 🟣 必须带 JWT
        },
      }
    )
      .then((res) => {
        setMessage("Blog created!");
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to create blog.");
      });
  };

  return (
    <div>
      <h1>Create Blog</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
