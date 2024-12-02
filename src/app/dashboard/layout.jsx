import { AppSidebar } from "@/components/client-components/app-sidebar";
import { AppHeader } from "@/components/client-components/app-header";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-col flex-1 gap-4 p-4">{children}</div>
      </SidebarInset>
      <ToastContainer />
    </SidebarProvider>
  );
}
