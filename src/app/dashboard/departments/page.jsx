"use client";

import React, { useState } from "react";

const initialDepartments = [
  { id: 1, name: "Human Resources", numberOfEmployees: 10 },
  { id: 2, name: "Engineering", numberOfEmployees: 25 },
  { id: 3, name: "Marketing", numberOfEmployees: 15 },
  { id: 4, name: "Sales", numberOfEmployees: 20 },
  { id: 5, name: "Finance", numberOfEmployees: 8 },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentEmployees, setNewDepartmentEmployees] = useState(0);

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (newDepartmentName.trim() === "") return;

    const newDepartment = {
      id: departments.length + 1,
      name: newDepartmentName,
      numberOfEmployees: newDepartmentEmployees,
    };

    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
    setNewDepartmentName("");
    setNewDepartmentEmployees(0);
  };

  return (
    <div className="p-6 flex">
      <div className="w-1/2 pr-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Departments</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["No.", "Department Name", "Number of Employees"].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((department) => (
                <tr key={department.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {department.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {department.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {department.numberOfEmployees}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-1/2 pl-4 mt-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Add New Department
        </h2>
        <form
          onSubmit={handleAddDepartment}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Employees
            </label>
            <input
              type="number"
              value={newDepartmentEmployees}
              onChange={(e) =>
                setNewDepartmentEmployees(Number(e.target.value))
              }
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
}
