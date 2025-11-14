import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  return (
    <div className="projects-container">
      <h1 className="projects-title">Projects</h1>

      {projects.length === 0 ? (
        <p className="no-projects">No projects found.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p._id} className="project-card">
              <h2 className="project-title">{p.title}</h2>
              <p className="project-desc">{p.description?.slice(0, 80)}...</p>

              <Link
                to={`/projects/${p._id}`}
                className="project-btn"
              >
                View More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
