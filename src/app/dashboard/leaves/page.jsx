"use client";

import React, { useState } from "react";

const initialLeaveData = [
  {
    id: 1,
    employee_name: "John Doe",
    leave_type: "Sick Leave",
    start_date: "2023-10-01",
    end_date: "2023-10-03",
    no_of_days: 3,
    reason: "Flu",
    status: "Pending",
  },
  {
    id: 2,
    employee_name: "Jane Smith",
    leave_type: "Vacation",
    start_date: "2023-10-05",
    end_date: "2023-10-10",
    no_of_days: 6,
    reason: "Family Trip",
    status: "Pending",
  },
  {
    id: 3,
    employee_name: "Alice Johnson",
    leave_type: "Personal Leave",
    start_date: "2023-10-12",
    end_date: "2023-10-14",
    no_of_days: 3,
    reason: "Personal Matters",
    status: "Pending",
  },
  {
    id: 4,
    employee_name: "Bob Brown",
    leave_type: "Sick Leave",
    start_date: "2023-10-15",
    end_date: "2023-10-17",
    no_of_days: 3,
    reason: "Medical Appointment",
    status: "Pending",
  },
  {
    id: 5,
    employee_name: "Charlie Davis",
    leave_type: "Vacation",
    start_date: "2023-10-20",
    end_date: "2023-10-25",
    no_of_days: 6,
    reason: "Holiday",
    status: "Pending",
  },
];

const initialLeaveTypes = [
  { id: 1, name: "Sick Leave" },
  { id: 2, name: "Vacation" },
  { id: 3, name: "Personal Leave" },
  { id: 4, name: "Maternity Leave" },
  { id: 5, name: "Paternity Leave" },
];

export default function LeavePage() {
  const [leaveData, setLeaveData] = useState(initialLeaveData);
  const [leaveTypes, setLeaveTypes] = useState(initialLeaveTypes);
  const [newLeaveTypeName, setNewLeaveTypeName] = useState("");

  const handleApprove = (id) => {
    setLeaveData((prevData) =>
      prevData.map((record) =>
        record.id === id ? { ...record, status: "Approved" } : record
      )
    );
  };

  const handleReject = (id) => {
    setLeaveData((prevData) =>
      prevData.map((record) =>
        record.id === id ? { ...record, status: "Rejected" } : record
      )
    );
  };

  const handleAddLeaveType = (e) => {
    e.preventDefault();
    if (newLeaveTypeName.trim() === "") return;

    const newLeaveType = {
      id: leaveTypes.length + 1,
      name: newLeaveTypeName,
    };

    setLeaveTypes((prevLeaveTypes) => [...prevLeaveTypes, newLeaveType]);
    setNewLeaveTypeName("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Leave Requests</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "No.",
                "Employee Name",
                "Leave Type",
                "Start Date",
                "End Date",
                "No. of Days",
                "Reason",
                "Status",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {record.employee_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.leave_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.start_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.end_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.no_of_days}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.reason}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : record.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleApprove(record.id)}
                    className="mr-2 px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(record.id)}
                    className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mt-20 mb-4">
        Leave Types
      </h2>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <div className="overflow-x-auto bg-white rounded-lg shadow mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["No.", "Leave Type"].map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaveTypes.map((leaveType) => (
                  <tr key={leaveType.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leaveType.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {leaveType.name}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-1/2 pl-4 -mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Add New Leave Type
          </h2>
          <form
            onSubmit={handleAddLeaveType}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leave Type Name
              </label>
              <input
                type="text"
                value={newLeaveTypeName}
                onChange={(e) => setNewLeaveTypeName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
            >
              Add Leave Type
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
