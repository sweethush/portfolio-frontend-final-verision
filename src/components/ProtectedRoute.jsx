import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // 如果未登录，自动跳到 /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 已登录，正常访问子页面
  return children;
}
