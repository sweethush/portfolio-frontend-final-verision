import { useState } from "react";
import api from "../api";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/projects", {
      title,
      description,
      imageUrl,
      repoUrl,
      liveUrl
    })
      .then(res => {
        setMessage("Project created!");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setRepoUrl("");
        setLiveUrl("");
      })
      .catch(err => {
        console.error(err);
        setMessage("Failed to create project.");
      });
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br />
        <input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} /><br />
        <input placeholder="Repo URL" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} /><br />
        <input placeholder="Live URL" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} /><br />

        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
