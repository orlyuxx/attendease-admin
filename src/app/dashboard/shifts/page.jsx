"use client";

import React, { useState } from "react";

const initialShifts = [
  { id: 1, name: "Morning Shift", startTime: "08:00 AM", endTime: "04:00 PM" },
  { id: 2, name: "Evening Shift", startTime: "04:00 PM", endTime: "12:00 AM" },
  { id: 3, name: "Night Shift", startTime: "12:00 AM", endTime: "08:00 AM" },
];

export default function ShiftsPage() {
  const [shifts, setShifts] = useState(initialShifts);
  const [newShiftName, setNewShiftName] = useState("");
  const [newShiftStartTime, setNewShiftStartTime] = useState("");
  const [newShiftEndTime, setNewShiftEndTime] = useState("");

  const handleAddShift = (e) => {
    e.preventDefault();
    if (newShiftName.trim() === "" || !newShiftStartTime || !newShiftEndTime)
      return;

    const newShift = {
      id: shifts.length + 1,
      name: newShiftName,
      startTime: newShiftStartTime,
      endTime: newShiftEndTime,
    };

    setShifts((prevShifts) => [...prevShifts, newShift]);
    setNewShiftName("");
    setNewShiftStartTime("");
    setNewShiftEndTime("");
  };

  return (
    <div className="p-6 flex">
      <div className="w-1/2 pr-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Shifts</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["No.", "Shift Name", "Start Time", "End Time"].map(
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
              {shifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shift.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {shift.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shift.startTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shift.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-1/2 pl-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Shift</h2>
        <form
          onSubmit={handleAddShift}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift Name
            </label>
            <input
              type="text"
              value={newShiftName}
              onChange={(e) => setNewShiftName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={newShiftStartTime}
              onChange={(e) => setNewShiftStartTime(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              value={newShiftEndTime}
              onChange={(e) => setNewShiftEndTime(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Add Shift
          </button>
        </form>
      </div>
    </div>
  );
}
