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
import { data } from "@/components/client-components/app-sidebar"; // Import your navigation data

export function BreadcrumbNav() {
  const pathname = usePathname();
  
  // Function to find the matching nav item title
  const findNavTitle = (path) => {
    // First check main items
    const mainItem = data.navMain.find(item => item.url === path);
    if (mainItem) return mainItem.title;

    // Then check sub items
    for (const main of data.navMain) {
      if (main.items) {
        const subItem = main.items.find(item => item.url === path);
        if (subItem) return subItem.title;
      }
    }

    // If no match found, return capitalized path segment
    const segment = path.split('/').pop();
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const currentTitle = findNavTitle(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">
            <p>Attendease Admin</p>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage><h3>{currentTitle}</h3></BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}