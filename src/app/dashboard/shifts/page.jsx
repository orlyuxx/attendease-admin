"use client";

import React, { useState, useEffect } from "react";

export default function ShiftsPage() {
  const [shifts, setShifts] = useState([]);
  const [newShiftName, setNewShiftName] = useState("");
  const [newShiftStartTime, setNewShiftStartTime] = useState("");
  const [newShiftEndTime, setNewShiftEndTime] = useState("");

  // Fetch shifts from API
  useEffect(() => {
    const fetchShifts = async () => {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      const response = await fetch("http://attendease-backend.test/api/shift", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched shifts:", data); // Debugging line
      setShifts(data); // Assuming the API returns an array of shifts
    };

    fetchShifts();
  }, []);

  const handleAddShift = async (e) => {
    e.preventDefault();
    if (newShiftName.trim() === "" || !newShiftStartTime || !newShiftEndTime)
      return;

    const newShift = {
      shift_name: newShiftName,
      shift_start: newShiftStartTime,
      shift_end: newShiftEndTime,
    };

    const response = await fetch("http://attendease-backend.test/api/shift", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newShift),
    });

    if (response.ok) {
      const createdShift = await response.json(); // Assuming the API returns the created shift
      setShifts((prevShifts) => [...prevShifts, createdShift]);
      setNewShiftName("");
      setNewShiftStartTime("");
      setNewShiftEndTime("");
    }
  };

  return (
    <div className="p-6 flex">
      <div className="w-1/2 pr-4">
        <h1 className="text-lg font-bold text-text-header mb-6">Shifts</h1>
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
              {shifts.map((shift, index) => (
                <tr key={shift.shift_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1} {/* Displaying index as No. */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {shift.shift_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shift.shift_start}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shift.shift_end}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-1/2 pl-4">
        <h2 className="text-lg font-bold text-text-header mb-4">
          Add New Shift
        </h2>
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
