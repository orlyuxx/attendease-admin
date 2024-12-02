import { EmployeesTable } from "@/components/client-components/employees-table";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmployeesPage() {
  return (
    <div className="container mx-auto pt-4 py-8">
      <ToastContainer position="top-right" />
      <Card>
        <CardContent>
          <EmployeesTable />
        </CardContent>
      </Card>
    </div>
  );
}
