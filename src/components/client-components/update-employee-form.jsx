import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { CheckCircle2, XCircle } from "lucide-react";

export function UpdateEmployeeForm({ employee, onEmployeeUpdated }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: employee.firstname,
    lastname: employee.lastname,
    email: employee.email,
    password: "", // Optional, only if changing password
    password_confirmation: "", // Required if password is provided
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://attendease-backend.test/api/updateUserDetails/${employee.user_id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(
            Object.fromEntries(
              Object.entries(formData).filter(([_, value]) => value !== "")
            )
          ),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Update failed");
      }

      toast({
        title: "Success",
        description: "Employee updated successfully",
        variant: "default",
        className: "bg-green-50 border-green-200 text-green-800",
        icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      });
      onEmployeeUpdated();
      setOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update employee",
        variant: "destructive",
        className: "bg-red-50 border-red-200 text-red-800",
        icon: <XCircle className="h-5 w-5 text-red-600" />,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-100 text-blue-600 border-blue-600 hover:bg-blue-300 hover:text-blue-500"
        >
          Update
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update Employee Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstname: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastname: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">New Password (Optional)</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Leave blank to keep current password"
            />
          </div>
          {formData.password && (
            <div className="space-y-2">
              <Label htmlFor="password_confirmation">
                Confirm New Password
              </Label>
              <Input
                id="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password_confirmation: e.target.value,
                  }))
                }
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-2 border-gray-300"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-my-blue hover:bg-my-blue-700">
              Update Employee
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
