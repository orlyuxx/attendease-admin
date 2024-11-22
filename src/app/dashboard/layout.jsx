import { AppSidebar } from "@/components/app-sidebar";
import { BreadcrumbNav } from "@/components/client-components/breadcrumb-c";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <header className="flex items-center justify-between h-16 border-b shrink-0">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <BreadcrumbNav />
          </div>
          <div className="px-3">
            <Avatar>
              <AvatarImage src="/profile.jpg" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
