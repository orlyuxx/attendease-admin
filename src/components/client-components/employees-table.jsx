'use client'

import React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/client-components/searchbar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { AddEmployeeForm } from "./add-employee-form"
import { ArrowUpDown } from "lucide-react"
import { UpdateEmployeeForm } from "./update-employee-form"
import { DeleteEmployee } from "./delete-employee"

// Helper function to format employee ID
const formatEmployeeId = (id) => {
  return String(id).padStart(3, '0');
};

export function EmployeesTable() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  })

  // Helper function that depends on departments state
  const getDepartmentName = (departmentId) => {
    if (!departments) return 'Loading...'
    const department = departments.find(dept => dept.department_id === departmentId)
    return department ? department.department_name : 'Unknown Department'
  }

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) => {
    if (!searchQuery) return true
    
    const searchTerm = searchQuery.toLowerCase()
    return (
      employee.firstname.toLowerCase().includes(searchTerm) ||
      employee.lastname.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      formatEmployeeId(employee.user_id).includes(searchTerm) ||
      getDepartmentName(employee.department_id).toLowerCase().includes(searchTerm)
    )
  })

  // Add sorting function
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  // Sort employees
  const sortedEmployees = React.useMemo(() => {
    let sortableItems = [...filteredEmployees]
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        // Special handling for name (combining first and last)
        if (sortConfig.key === 'name') {
          aValue = `${a.firstname} ${a.lastname}`
          bValue = `${b.firstname} ${b.lastname}`
        }
        // Special handling for employee_id (formatting)
        if (sortConfig.key === 'user_id') {
          aValue = formatEmployeeId(a.user_id)
          bValue = formatEmployeeId(b.user_id)
        }
        // Special handling for department (getting name)
        if (sortConfig.key === 'department_id') {
          aValue = getDepartmentName(a.department_id)
          bValue = getDepartmentName(b.department_id)
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [filteredEmployees, sortConfig])

  // Update pagination calculations to use sorted employees
  const totalPages = Math.ceil(sortedEmployees.length / entriesPerPage)
  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = sortedEmployees.slice(indexOfFirstEntry, indexOfLastEntry)

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        
        if (!token) {
          setError('No authentication token found')
          return
        }

        // Updated to use /department endpoint
        const [employeesResponse, departmentsResponse] = await Promise.all([
          fetch('http://attendease-backend.test/api/user', {
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }),
          fetch('http://attendease-backend.test/api/department', {
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          })
        ])

        if (!employeesResponse.ok || !departmentsResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const [employeesData, departmentsData] = await Promise.all([
          employeesResponse.json(),
          departmentsResponse.json()
        ])

        setEmployees(employeesData)
        setDepartments(departmentsData)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const refreshEmployees = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        throw new Error('Authentication token not found')
      }

      const response = await fetch('http://attendease-backend.test/api/user', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })

      if (response.status === 401) {
        throw new Error('Please login again')
      }

      if (!response.ok) {
        throw new Error('Failed to fetch employees')
      }

      const data = await response.json()
      setEmployees(data)
    } catch (error) {
      console.error('Error fetching employees:', error)
      if (error.message === 'Please login again') {
        window.location.href = '/login'
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEmployeeDeleted = () => {
    // Refresh the employees list
    refreshEmployees()
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4 pt-4">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            Employees
          </h3>
          <AddEmployeeForm onEmployeeAdded={refreshEmployees} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#71717A]">Show</span>
            <Select 
              defaultValue="10" 
              onValueChange={(value) => setEntriesPerPage(Number(value))}
            >
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
          <SearchBar 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees..."
          />
        </div>
      </div>

      {/* Table Section */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-[#71717A] text-sm">No.</TableHead>
            <TableHead 
              className={`text-[#71717A] text-sm cursor-pointer hover:text-black ${
                sortConfig.key === 'name' ? 'text-black font-medium' : ''
              }`}
              onClick={() => handleSort('name')}
            >
              Name
              <ArrowUpDown 
                className={`ml-1 h-4 w-4 inline pl-1 ${
                  sortConfig.key === 'name' ? 'text-black' : ''
                }`} 
              />
            </TableHead>
            <TableHead 
              className={`text-[#71717A] text-sm cursor-pointer hover:text-black ${
                sortConfig.key === 'user_id' ? 'text-black font-medium' : ''
              }`}
              onClick={() => handleSort('user_id')}
            >
              Employee ID
              <ArrowUpDown 
                className={`ml-1 h-4 w-4 inline pl-1 ${
                  sortConfig.key === 'user_id' ? 'text-black' : ''
                }`}
              />
            </TableHead>
            <TableHead 
              className={`text-[#71717A] text-sm cursor-pointer hover:text-black ${
                sortConfig.key === 'department_id' ? 'text-black font-medium' : ''
              }`}
              onClick={() => handleSort('department_id')}
            >
              Department
              <ArrowUpDown 
                className={`ml-1 h-4 w-4 inline pl-1 ${
                  sortConfig.key === 'department_id' ? 'text-black' : ''
                }`}
              />
            </TableHead>
            <TableHead className="text-[#71717A] text-sm">Email</TableHead>
            <TableHead className="text-[#71717A] text-sm text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEntries.length > 0 ? (
            currentEntries.map((user, index) => (
              <TableRow 
                key={`employee-${user.user_id}`}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="font-medium text-[#09090b] text-sm py-2.5">
                  {indexOfFirstEntry + index + 1}
                </TableCell>
                <TableCell className="w-[200px] text-[#09090b] text-sm py-2.5">
                  <Link 
                    href={`/dashboard/employees/${user.user_id}`}
                    className="border-b border-dotted border-gray-400 hover:border-solid hover:border-blue-600 hover:text-blue-600"
                  >
                    {`${user.firstname} ${user.lastname}`}
                  </Link>
                </TableCell>
                <TableCell className="text-[#09090b] text-sm py-2.5">
                  {formatEmployeeId(user.user_id)}
                </TableCell>
                <TableCell className="text-[#09090b] text-sm py-2.5">
                  {getDepartmentName(user.department_id)}
                </TableCell>
                <TableCell className="text-[#09090b] text-sm py-2.5">
                  {user.email}
                </TableCell>
                
                <TableCell className="text-right py-2.5">
                  <div className="flex justify-end gap-2">
                    <UpdateEmployeeForm 
                      employee={user} 
                      onEmployeeUpdated={refreshEmployees}
                    />
                    <DeleteEmployee 
                      employee={user}
                      onEmployeeDeleted={handleEmployeeDeleted}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                {searchQuery ? 'No matching records found' : 'No employees found'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Section */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredEmployees.length > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, filteredEmployees.length)} of {filteredEmployees.length} entries
          {searchQuery && ` (filtered from ${employees.length} total entries)`}
        </p>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              return null
            })}

            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}