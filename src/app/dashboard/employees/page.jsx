import { TableDemo } from "@/components/table"
import { SearchBar } from "@/components/searchbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function EmployeesPage() {
  return (
    <div className="container mx-auto pt-4 py-8">
      <Card>
        <CardHeader className="space-y-0 pb-7">
          <div className="flex items-center justify-between">
            <CardTitle>
              <h3 className="text-xl font-bold">
                Employees
              </h3>
            </CardTitle>
            <Button size='sm'>Add Employee</Button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[#71717A]">Show</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-[70px] h-8 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-[#71717A]">entries</span>
            </div>
            <SearchBar />
          </div>
        </CardHeader>
        <CardContent>
          <TableDemo />
        </CardContent>
      </Card>
    </div>
  )
}