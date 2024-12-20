"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify"; // Updated import for React Toastify

// Custom toast function
const customToast = (message, type = "default") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check token on mount
    const token = localStorage.getItem("token");
    if (!token && window.location.pathname.startsWith("/dashboard")) {
      router.push("/login");
    }
  }, [router]);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://attendease-backend.test/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);

        customToast("Logging in", "success");

        // Add a small delay before navigation
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/dashboard");
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
