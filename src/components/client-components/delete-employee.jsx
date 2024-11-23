"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/toast"

export function DeleteEmployee({ employee, onEmployeeDeleted }) {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://attendease-backend.test/api/user/${employee.user_id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Delete failed')
      }

      toast({
        title: "Success",
        description: "Employee deleted successfully",
        variant: "default"
      })
      
      onEmployeeDeleted()
      setOpen(false)
    } catch (error) {
      console.error('Error deleting employee:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete employee",
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="hover:bg-red-100 hover:text-red-600 hover:border-red-600"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {employee.firstname} {employee.lastname}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}