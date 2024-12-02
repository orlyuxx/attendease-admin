import React from "react";

import { LoginForm } from "@/components/client-components/login-form";
import { ToastContainer } from "react-toastify";

export default function LoginPage() {
  return (
    <div className="bg-my-blue-500 min-h-screen flex items-center justify-center w-full h-screen px-4">
      <LoginForm />
      <ToastContainer />
    </div>
  );
}
