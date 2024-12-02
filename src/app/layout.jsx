import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import RouteGuard from "@/components/auth/route-guard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Attendease Dashboard",
  description: "Attendence is now easy with Attendease",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="icon" href="/attendease-icon.png" />
        </head>
        <body className={inter.className}>
          <AuthProvider>
            <RouteGuard>{children}</RouteGuard>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
