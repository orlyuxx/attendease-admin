"use client";

import React, { useState, useEffect } from "react";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      const response = await fetch(
        "http://attendease-backend.test/api/department",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("Fetched departments:", data); // Debugging line
      setDepartments(data); // Assuming the API returns an array of departments
    };

    fetchDepartments();
  }, []);

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (newDepartmentName.trim() === "") return;

    const response = await fetch(
      "http://attendease-backend.test/api/department",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ department_name: newDepartmentName }),
      }
    );

    if (response.ok) {
      const newDepartment = await response.json(); // Assuming the API returns the created department
      setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
      setNewDepartmentName("");
    }
  };

  return (
    <div className="p-6 flex">
      <div className="w-1/2 pr-4">
        <h1 className="text-lg font-bold text-text-header mb-6">Departments</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { id: "number", label: "No." },
                  { id: "name", label: "Department Name" },
                ].map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((department) => (
                <tr key={department.department_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {department.department_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {department.department_name}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-1/2 pl-4 mt-2">
        <h2 className="text-lg font-bold text-text-header mb-4">
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
