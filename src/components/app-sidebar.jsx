"use client";
import * as React from "react"
import { usePathname } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react"

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
        },
        {
          title: "Employees",
          url: "/dashboard/employees",
        },
        {
          title: "Attendance",
          url: "/dashboard/attendance",
        },
        {
          title: "Departments",
          url: "/dashboard/departments",
        },
        {
          title: "Shifts",
          url: "/dashboard/shifts",
        },
        {
          title: "Leaves",
          url: "/dashboard/leaves",
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
        {
          title: "Print Records",
          url: "/dashboard/print",
        },
        {
          title: "Logout",
          url: "#",
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
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">Attendease</span>
                </div>
              </a>
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
                  isActive={isActiveUrl(mainItem.url)}
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
                          isActive={isActiveUrl(subItem.url)}
                        >
                          <a href={subItem.url}>{subItem.title}</a>
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
