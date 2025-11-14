# Full-Stack Portfolio Website (React + Node.js)

This is my full-stack Personal Portfolio built as the capstone project for the course **Web Programming – Building the Modern User Interface**.

The project includes a full React frontend connected to a deployed Node.js/Express REST API, featuring user authentication, protected routes, an admin dashboard, and full CRUD operations on Projects and Blog Posts.

---

## 🚀 Live Demo

### 🌐 Front-End (Vercel)
👉 https://YOUR-FRONTEND.vercel.app  
*(replace after deployment)*

### 🌐 Back-End (Render)
👉 https://portfolio-blog-api-qbke.onrender.com  

---

## 📌 Features

### 🎨 Front-End (React)
- Fully component-based architecture
- Multi-page SPA using React Router
- User authentication (Login / Register / Logout)
- Global Auth State using Context API
- Protected route: `/admin`
- CRUD operations for:
  - Projects
  - Blog Posts
  - Blog Comments
- Contact form integrated with backend API
- Clean, responsive layout

### 🛠 Back-End (Node + Express + MongoDB)
- REST API with JWT authentication
- CRUD for Projects and Blog Posts
- Nested Blog Comments:  
  `POST /api/blog/:id/comments`
- Contact message handling:
  `POST /api/contact`
- MongoDB with Mongoose models
- CORS configured for deployment

---

## 📁 Pages Included

| Path | Description |
|------|-------------|
| `/` | Home / About |
| `/projects` | List of projects |
| `/projects/:id` | Project detail |
| `/create-project` | Create new project |
| `/projects/:id/edit` | Edit project |
| `/blog` | Blog list |
| `/blog/:id` | Blog post detail + comments |
| `/create-blog` | Create blog post |
| `/blog/:id/edit` | Edit blog post |
| `/contact` | Contact form |
| `/login` | Login |
| `/register` | Register |
| `/admin` | Admin Dashboard (Protected) |

---

## 🧩 Tech Stack

### Front-End
- React 18
- React Router 6
- Axios
- Context API
- Vite

### Back-End
- Node.js
- Express
- MongoDB Atlas
- JWT for authentication
- Render (deployment)

---

## 🛠 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-REPO.git
cd portfolio-frontend
