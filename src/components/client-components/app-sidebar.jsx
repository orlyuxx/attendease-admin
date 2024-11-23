"use client";
import * as React from "react"
import { useRouter } from "next/navigation";
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
  LogOut,
  MoreVertical
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

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

export function AppSidebar({
  ...props
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Move handleLogout inside the component
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://attendease-backend.test/api/logout', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      localStorage.removeItem('token')
      
      toast({
        title: "Success",
        description: "Logged out successfully",
        variant: "default"
      })

      router.push('/login')
      
    } catch (err) {
      console.error('Error logging out:', err)
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive"
      })
    }
  }

  // Move data object inside component to use handleLogout
  const data = {
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
            onClick: handleLogout
          },
        ],
      },
    ],
  }

  // Function to check if a URL matches the current path
  const isActiveUrl = (url) => {
    if (url === "#") return false;
    return pathname === url;
  };

  // Modify the icon rendering to be dynamic based on active state
  const renderIcon = (icon, isActive) => {
    return React.cloneElement(icon, {
      className: `h-4 w-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`
    });
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
                              ? "bg-accent text-accent-foreground font-medium hover:bg-accent" 
                              : "hover:bg-accent hover:text-accent-foreground hover:font-medium transition-all"
                          }`}
                        >
                          {subItem.onClick ? (
                            <button 
                              onClick={subItem.onClick}
                              className="flex items-center gap-2 w-full"
                            >
                              {renderIcon(subItem.icon, isActiveUrl(subItem.url))}
                              <span className={`transition-all ${isActiveUrl(subItem.url) ? "font-bold" : ""}`}>
                                {subItem.title}
                              </span>
                            </button>
                          ) : (
                            <a href={subItem.url} className="flex items-center gap-2">
                              {renderIcon(subItem.icon, isActiveUrl(subItem.url))}
                              <span className={`transition-all ${isActiveUrl(subItem.url) ? "font-bold" : ""}`}>
                                {subItem.title}
                              </span>
                            </a>
                          )}
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
      <div className="mt-auto border-t">
        <div className="p-4 flex items-center gap-4">
          <img 
            src="/profile.jpg"
            alt="Profile avatar" 
            className="w-8 h-8 rounded-md"
          />
          <div className="flex flex-col flex-1">
            <span className="text-sm font-medium">Admin</span>
            <span className="text-xs text-muted-foreground">admin@gmail.com</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}

// Export the data structure (without the handleLogout function)
export const navigationData = {
  navMain: [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        // ... other items (same as above but without onClick handlers)
      ],
    },
    {
      title: "System",
      items: [
        // ... other items
        {
          title: "Logout",
          url: "#",
          icon: <LogOut className="h-4 w-4" />,
        },
      ],
    },
  ],
}
