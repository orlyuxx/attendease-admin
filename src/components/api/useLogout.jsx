import { toast } from "react-toastify"; // Updated import for React Toastify
import { useRouter } from "next/navigation"; // Import useRouter for navigation

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

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://attendease-backend.test/api/logout",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("token");
      customToast("Logging out", "success");

      // Add a small delay before navigation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/login");
    } catch (err) {
      console.error("Error logging out:", err);
      customToast("Failed to logout", "error");
    }
  };

  return handleLogout;
};
