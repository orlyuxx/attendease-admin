import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="flex w-[300px] items-center space-x-2">
      <div className="relative w-full">
        <Input 
          type="text" 
          placeholder="Search employees..." 
          className="h-8 text-sm pr-8 focus-visible:ring-1 focus-visible:ring-[#09090b] focus-visible:ring-offset-0"
        />
        <Search className="h-4 w-4 absolute right-2.5 top-2 text-[#09090b]" />
      </div>
      <Button type="submit" size="sm" className="h-8">
        Search
      </Button>
    </div>
  )
}
