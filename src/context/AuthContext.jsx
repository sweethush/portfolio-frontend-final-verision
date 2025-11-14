import { createContext, useContext, useState } from "react";
import api from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // 登录方法
  const login = async (email, password) => {
    const res = await api.post("/users/login", { email, password });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

    setUser({
      _id: res.data._id,
      username: res.data.username,
      email: res.data.email
    });
  };

  // 注册方法
  const register = async (username, email, password) => {
    await api.post("/users/register", { username, email, password });
  };

  // 登出方法
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
