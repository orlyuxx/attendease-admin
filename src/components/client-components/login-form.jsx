"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Shield, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.error || "Invalid credentials");
        return;
      }

      // Login successful - AuthContext will handle the redirect
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="relative container mt-8 px-4">
        <div className="max-w-md mx-auto shadow-2xl">
          <Card className="w-full mx-auto backdrop-blur-sm bg-white/95 border-t-4 border-t-blue-600">
            <div className="flex justify-center -mt-12">
              <div className="relative w-28 h-28">
                <Image
                  src="/birlogo.png"
                  alt="BIR Logo"
                  fill
                  sizes="(max-width: 80px) 100vw, 80px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <CardHeader className="text-center text-text-header space-y-2 -mt-8">
              <CardTitle className="text-2xl font-serif">
                BIR Butuan City
              </CardTitle>
              <CardTitle className="text-2xl text-text-header font-serif">
                Attendease Login Portal
              </CardTitle>
              <CardDescription className="text-text-sub max-w-sm mx-auto pt-2">
                Access your Attendease admin account to manage your employees'
                attendance.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-6">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded flex items-center gap-2">
                    <Info size={16} className="flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid gap-2 mt-4">
                  <Label htmlFor="email" className="font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // placeholder="example@gmail.com"
                    className="border-2 border-gray-300 "
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-medium">
                      Password
                    </Label>
                    <Link
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                      tabIndex={-1}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" focus:ring-1 focus:ring-gray-950 border-2 border-gray-300"
                    disabled={isLoading}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-my-blue hover:bg-my-blue-700 text-white py-2.5 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Login to Your Account"
                  )}
                </Button>
              </form>

              {/* <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield size={14} />
                  This is an official government portal
                </div>
              </div> */}

              <div className="mt-4 text-sm text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Register here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 text-center text-sm text-text-header font-medium">
          Need help? Contact BIR Support at{" "}
          <span className="font-medium">1-234-5678</span>
        </div>
      </div>
    </div>
  );
}
