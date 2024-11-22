import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import Link from "next/link"
  

const employees = [
    {
      id: "EMP001",
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
    },
    {
      id: "EMP002",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "Marketing",
    },
    {
      id: "EMP003",
      name: "Robert Johnson",
      email: "robert.j@company.com",
      department: "HR",
    },
    {
      id: "EMP004",
      name: "Emily Davis",
      email: "emily.d@company.com",
      department: "Engineering",
    },
    {
      id: "EMP005",
      name: "Michael Wilson",
      email: "michael.w@company.com",
      department: "Sales",
    },
    {
      id: "EMP006",
      name: "Sarah Brown",
      email: "sarah.b@company.com",
      department: "Marketing",
    },
    {
      id: "EMP007",
      name: "David Miller",
      email: "david.m@company.com",
      department: "Engineering",
    },
    {
      id: "EMP008",
      name: "Lisa Anderson",
      email: "lisa.a@company.com",
      department: "HR",
    },
    {
      id: "EMP009",
      name: "James Taylor",
      email: "james.t@company.com",
      department: "Sales",
    },
    {
      id: "EMP010",
      name: "Jennifer White",
      email: "jennifer.w@company.com",
      department: "Engineering",
    },
    {
      id: "EMP011",
      name: "Daniel Lee",
      email: "daniel.l@company.com",
      department: "Marketing",
    },
    {
      id: "EMP012",
      name: "Michelle Clark",
      email: "michelle.c@company.com",
      department: "HR",
    },
    {
      id: "EMP013",
      name: "Kevin Martinez",
      email: "kevin.m@company.com",
      department: "Engineering",
    },
    {
      id: "EMP014",
      name: "Amanda Rodriguez",
      email: "amanda.r@company.com",
      department: "Sales",
    },
    {
      id: "EMP015",
      name: "Thomas Wright",
      email: "thomas.w@company.com",
      department: "Marketing",
    },
    {
      id: "EMP016",
      name: "Patricia Turner",
      email: "patricia.t@company.com",
      department: "Engineering",
    },
    {
      id: "EMP017",
      name: "George Harris",
      email: "george.h@company.com",
      department: "Sales",
    },
    {
      id: "EMP018",
      name: "Elizabeth King",
      email: "elizabeth.k@company.com",
      department: "HR",
    },
    {
      id: "EMP019",
      name: "Richard Scott",
      email: "richard.s@company.com",
      department: "Marketing",
    },
    {
      id: "EMP020",
      name: "Susan Adams",
      email: "susan.a@company.com",
      department: "Engineering",
    }
  ]
  
  // ... rest of the component remains the same ...
  
  // ... imports remain the same ...

export function TableDemo() {
    return (
      <Table>
        <TableCaption>A list of employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-[#71717A] text-sm">No.</TableHead>
            <TableHead className="text-[#71717A] text-sm">Name</TableHead>
            <TableHead className="text-[#71717A] text-sm">Employee ID</TableHead>
            <TableHead className="text-[#71717A] text-sm">Email</TableHead>
            <TableHead className="text-[#71717A] text-sm">Department</TableHead>
            <TableHead className="text-right text-[#71717A] text-sm">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow 
              key={employee.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <TableCell className="font-medium text-[#09090b] text-sm py-2.5">{index + 1}</TableCell>
              <TableCell className="text-[#09090b] text-sm py-2.5">
                <Link href={`/dashboard/employees/${employee.id}`}>
                  {employee.name}
                </Link>
              </TableCell>
              <TableCell className="text-[#09090b] text-sm py-2.5">{employee.id}</TableCell>
              <TableCell className="text-[#09090b] text-sm py-2.5">{employee.email}</TableCell>
              <TableCell className="text-[#09090b] text-sm py-2.5">{employee.department}</TableCell>
              <TableCell className="text-right py-2.5">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-blue-100 hover:text-blue-600 hover:border-blue-600"
                  >
                    Update
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-red-100 hover:text-red-600 hover:border-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }