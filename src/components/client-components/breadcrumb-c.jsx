"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbNav() {
  const pathname = usePathname();
  
  // Function to get the current page title
  const getCurrentPageTitle = (path) => {
    // Remove trailing slash if exists
    path = path.replace(/\/$/, '');
    
    // Map of paths to titles
    const pathTitles = {
      '/dashboard': 'Dashboard',
      '/dashboard/employees': 'Employees',
      '/dashboard/attendance': 'Attendance',
      '/dashboard/departments': 'Departments',
      '/dashboard/shifts': 'Shifts',
      '/dashboard/leaves': 'Leaves',
      '/dashboard/print': 'Print Records',
      '/dashboard/user-settings': 'Settings'
    };

    return pathTitles[path] || 'Dashboard';
  };

  const currentTitle = getCurrentPageTitle(pathname);
  const isSubPage = pathname !== '/dashboard';

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
            Attendease Admin
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {pathname === '/dashboard' ? (
            <BreadcrumbPage className="font-medium text-foreground">
              Dashboard
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {isSubPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-foreground">
                {currentTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}