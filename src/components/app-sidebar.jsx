"use client";
import * as React from "react"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  GalleryVerticalEnd,
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Building2,
  Clock,
  CalendarDays,
  Printer,
  Settings,
  LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Export the data without isActive property - we'll compute it dynamically
export const data = {
  navMain: [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          title: "Employees",
          url: "/dashboard/employees",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Attendance",
          url: "/dashboard/attendance",
          icon: <ClipboardCheck className="h-4 w-4" />,
        },
        {
          title: "Departments",
          url: "/dashboard/departments",
          icon: <Building2 className="h-4 w-4" />,
        },
        {
          title: "Shifts",
          url: "/dashboard/shifts",
          icon: <Clock className="h-4 w-4" />,
        },
        {
          title: "Leaves",
          url: "/dashboard/leaves",
          icon: <CalendarDays className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Print Records",
          url: "/dashboard/print",
          icon: <Printer className="h-4 w-4" />,
        },
        {
          title: "Settings",
          url: "/dashboard/user-settings",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          title: "Logout",
          url: "#",
          icon: <LogOut className="h-4 w-4" />,
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const pathname = usePathname();

  // Function to check if a URL matches the current path
  const isActiveUrl = (url) => {
    if (url === "#") return false;
    return pathname === url;
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">Attendease</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((mainItem) => (
              <SidebarMenuItem key={mainItem.title}>
                <SidebarMenuButton 
                  asChild 
                  className={`${
                    isActiveUrl(mainItem.url) 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <a href={mainItem.url} className="font-medium">
                    {mainItem.title}
                  </a>
                </SidebarMenuButton>
                {mainItem.items?.length ? (
                  <SidebarMenuSub>
                    {mainItem.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton 
                          asChild 
                          className={`${
                            isActiveUrl(subItem.url) 
                              ? "bg-accent text-accent-foreground" 
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <a href={subItem.url} className="flex items-center gap-2">
                            {subItem.icon}
                            {subItem.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
