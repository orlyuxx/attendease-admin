import { toast } from "react-toastify"; // Updated import for React Toastify
// ... existing code ...

// Custom toast function
const customToast = (message, type = "default") => {
  toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// ... existing code ...

customToast("Logged out successfully", "success"); // Updated to use custom toast
// ... existing code ...

customToast("Failed to logout", "error"); // Updated to use custom toast
// ... existing code ...
