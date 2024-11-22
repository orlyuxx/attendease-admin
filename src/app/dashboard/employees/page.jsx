import { EmployeesTable } from "@/components/client-components/employees-table"
import { Card, CardContent } from "@/components/ui/card"

export default function EmployeesPage() {
  return (
    <div className="container mx-auto pt-4 py-8">
      <Card>
        <CardContent>
          <EmployeesTable />
        </CardContent>
      </Card>
    </div>
  )
} 