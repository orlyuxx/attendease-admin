import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  // Get token from cookies server-side
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // Redirect based on auth status
  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  // This won't be rendered due to redirect
  return null;
}
