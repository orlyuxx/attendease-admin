import React from "react";

import { LoginForm } from "@/components/client-components/login-form";

export default function LoginPage() {
  return (
    <div className="login-page min-h-screen flex items-center justify-center w-full h-screen px-4">
      <LoginForm />
    </div>
  );
}
