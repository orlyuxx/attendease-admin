'use client'

import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";
import { BreadcrumbNav } from "./breadcrumb-c";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";

export function AppHeader() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 flex items-center justify-between h-16 shrink-0 transition-all duration-200 border-b ${
      isScrolled 
        ? "bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 shadow-sm border-border" 
        : "bg-white shadow-sm border-border/40"
    }`}>
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4 mr-2" />
        <BreadcrumbNav />
      </div>
      <div className="px-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer hover:opacity-80">
              <AvatarImage src="/profile.jpg" alt="Profile" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/profile.jpg" alt="Profile" />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">admin@example.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer text-red-600 dark:text-red-400"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}