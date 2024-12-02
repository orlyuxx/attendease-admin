"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      // If no token and not on login page, redirect to login
      if (!token && window.location.pathname.startsWith("/dashboard")) {
        router.push("/login");
      }

      // If token exists and on login page, redirect to dashboard
      if (token && window.location.pathname === "/login") {
        router.push("/dashboard");
      }
    }
  }, [router]);

  return <>{children}</>;
}
