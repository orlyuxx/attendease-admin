'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-[250px]">
      <Input 
        type="text" 
        placeholder="Search employees..." 
        className="h-8 text-sm pr-8 focus-visible:ring-1 focus-visible:ring-[#09090b] focus-visible:ring-offset-0"
        value={value}
        onChange={onChange}
      />
      <Search className="h-4 w-4 absolute right-2.5 top-2 text-[#09090b]" />
    </div>
  )
}
