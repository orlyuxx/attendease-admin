"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";

const employees = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Brown" },
  { id: 5, name: "Charlie Davis" },
];

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function PrintPage() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handlePrint = () => {
    if (!selectedEmployee || !selectedMonth) {
      alert("Please select both an employee and a month.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("DAILY TIME RECORD", 14, 20);
    doc.text(`For the month of ${selectedMonth}`, 14, 30);
    doc.text(`Employee: ${selectedEmployee}`, 14, 40);
    doc.text("Official hours for arrival and departure", 14, 50);
    doc.text("Regular Days: __________", 14, 60);
    doc.text("Saturdays: __________", 14, 70);
    doc.text("Day", 14, 90);
    doc.text("A.M.", 50, 90);
    doc.text("P.M.", 90, 90);
    doc.text("Undertime", 130, 90);

    // Add table headers
    doc.text("Arrival", 50, 100);
    doc.text("Departure", 70, 100);
    doc.text("Arrival", 90, 100);
    doc.text("Departure", 110, 100);
    doc.text("Hours", 130, 100);
    doc.text("Minutes", 140, 100);

    // Add empty rows for days
    for (let i = 1; i <= 31; i++) {
      doc.text(i.toString(), 14, 100 + i * 10);
      doc.text("__________", 50, 100 + i * 10);
      doc.text("__________", 70, 100 + i * 10);
      doc.text("__________", 90, 100 + i * 10);
      doc.text("__________", 110, 100 + i * 10);
      doc.text("__________", 130, 100 + i * 10);
      doc.text("__________", 140, 100 + i * 10);
    }

    // Add total row
    doc.text("Total", 14, 100 + 32 * 10);
    doc.text("__________", 50, 100 + 32 * 10);
    doc.text("__________", 70, 100 + 32 * 10);
    doc.text("__________", 90, 100 + 32 * 10);
    doc.text("__________", 110, 100 + 32 * 10);
    doc.text("__________", 130, 100 + 32 * 10);
    doc.text("__________", 140, 100 + 32 * 10);

    doc.text(
      "I certify on my honor that the above is a true and correct report of the hours of work performed, record of which was made daily at the time of arrival and departure from office.",
      14,
      100 + 34 * 10
    );
    doc.text("VERIFIED as to the prescribed office hours:", 14, 100 + 36 * 10);
    doc.text("In Charge", 14, 100 + 38 * 10);
    doc.text("(SEE INSTRUCTION ON BACK)", 14, 100 + 40 * 10);

    doc.save(`DTR_${selectedEmployee}_${selectedMonth}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Print Records</h1>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Employee
          </label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-1/2"
            required
          >
            <option value="">-- Select Employee --</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-1/2"
            required
          >
            <option value="">-- Select Month --</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        {(!selectedEmployee || !selectedMonth) && (
          <p className="text-red-500 mb-4">
            No Data, Please Pick Your Employee and Month
          </p>
        )}

        <button
          onClick={handlePrint}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
        >
          Print Records
        </button>
      </div>
    </div>
  );
}
