// src/pages/EditProject.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  const [message, setMessage] = useState("");

  // 加载项目原始数据
  useEffect(() => {
    api
      .get(`/projects/${id}`)   // ❗ 没有 /api
      .then(res => {
        const p = res.data;
        setTitle(p.title);
        setDescription(p.description);
        setImage(p.image || "");
        setRepoUrl(p.repoUrl || "");
        setLiveUrl(p.liveUrl || "");
      })
      .catch(err => {
        console.error(err);
        setMessage("Failed to load project.");
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to edit.");
      return;
    }

    api.put(
      `/projects/${id}`,          // ❗ 正确：没有 /api
      { title, description, image, repoUrl, liveUrl },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        setMessage("Project updated!");

        // ⭐ 更新后跳回该项目的详情页
        setTimeout(() => navigate(`/projects/${id}`), 800);
      })
      .catch(() => setMessage("Failed to update."));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Project</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          placeholder="Project title"
          onChange={e => setTitle(e.target.value)}
        />
        <br />

        <textarea
          value={description}
          placeholder="Project description"
          onChange={e => setDescription(e.target.value)}
        />
        <br />

        <input
          type="text"
          value={image}
          placeholder="Image URL"
          onChange={e => setImage(e.target.value)}
        />
        <br />

        <input
          type="text"
          value={repoUrl}
          placeholder="GitHub Repo URL"
          onChange={e => setRepoUrl(e.target.value)}
        />
        <br />

        <input
          type="text"
          value={liveUrl}
          placeholder="Live Demo URL"
          onChange={e => setLiveUrl(e.target.value)}
        />
        <br />

        <button>Update Project</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
