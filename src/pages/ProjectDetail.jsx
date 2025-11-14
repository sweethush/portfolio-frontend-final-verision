import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [project, setProject] = useState(null);

  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const deleteProject = () => {
    if (!window.confirm("Delete this project?")) return;

    api
      .delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate("/projects"))
      .catch((err) => console.error(err));
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      {/* IMAGE */}
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "400px",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        />
      )}

      {/* LINKS */}
      <div style={{ marginBottom: "20px" }}>
        {project.repoUrl && (
          <p>
            <strong>GitHub Repo: </strong>
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              {project.repoUrl}
            </a>
          </p>
        )}

        {project.liveUrl && (
          <p>
            <strong>Live Demo: </strong>
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              {project.liveUrl}
            </a>
          </p>
        )}
      </div>

      {/* ADMIN BUTTONS */}
      {token && (
        <>
          <Link
            to={`/projects/${project._id}/edit`}
            style={{
              padding: "6px 12px",
              background: "purple",
              color: "white",
              borderRadius: "5px",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Edit
          </Link>

          <button
            onClick={deleteProject}
            style={{
              padding: "6px 12px",
              background: "red",
              color: "white",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
