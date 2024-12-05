import React from "react";

const attendanceData = [
  {
    id: 1,
    employee_name: "John Doe",
    user_id: "EMP001",
    time_in: "08:00 AM",
    time_in_status: "On Time",
    break_in: "12:00 PM",
    break_in_status: "On Time",
    break_out: "01:00 PM",
    break_out_status: "On Time",
    time_out: "05:00 PM",
    time_out_status: "On Time",
  },
  {
    id: 2,
    employee_name: "Jane Smith",
    user_id: "EMP002",
    time_in: "08:15 AM",
    time_in_status: "Late",
    break_in: "12:15 PM",
    break_in_status: "Late",
    break_out: "01:15 PM",
    break_out_status: "On Time",
    time_out: "05:15 PM",
    time_out_status: "On Time",
  },
  {
    id: 3,
    employee_name: "Alice Johnson",
    user_id: "EMP003",
    time_in: "08:00 AM",
    time_in_status: "On Time",
    break_in: "12:00 PM",
    break_in_status: "On Time",
    break_out: "01:00 PM",
    break_out_status: "On Time",
    time_out: "05:00 PM",
    time_out_status: "On Time",
  },
  {
    id: 4,
    employee_name: "Bob Brown",
    user_id: "EMP004",
    time_in: "08:30 AM",
    time_in_status: "Late",
    break_in: "12:30 PM",
    break_in_status: "On Time",
    break_out: "01:30 PM",
    break_out_status: "Late",
    time_out: "05:30 PM",
    time_out_status: "On Time",
  },
  {
    id: 5,
    employee_name: "Charlie Davis",
    user_id: "EMP005",
    time_in: "08:00 AM",
    time_in_status: "On Time",
    break_in: "12:00 PM",
    break_in_status: "On Time",
    break_out: "01:00 PM",
    break_out_status: "On Time",
    time_out: "05:00 PM",
    time_out_status: "On Time",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Attendance Records
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "No.",
                "Employee Name",
                "User ID",
                "Time In",
                "Status",
                "Break In",
                "Status",
                "Break Out",
                "Status",
                "Time Out",
                "Status",
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
            {attendanceData.map((record) => (
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
                  {record.user_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.time_in}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.time_in_status === "Late"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {record.time_in_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.break_in}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.break_in_status === "Late"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {record.break_in_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.break_out}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.break_out_status === "Late"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {record.break_out_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.time_out}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.time_out_status === "Late"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {record.time_out_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
