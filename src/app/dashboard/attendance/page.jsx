"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const fetchAttendanceData = async (token) => {
  try {
    const response = await fetch(
      "http://attendease-backend.test/api/attendance",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text(); // Get the error message from the response
      throw new Error(`Failed to fetch attendance data: ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchAttendanceData:", error); // Log the error for debugging
    throw error; // Re-throw the error to be handled in the calling function
  }
};

// Function to fetch user data based on user_id
const fetchUserData = async (userId, token) => {
  try {
    if (!userId) {
      console.warn("User ID is missing");
      return createDefaultUser(userId);
    }

    const response = await fetch(
      `http://attendease-backend.test/api/user/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.warn(
        `Failed to fetch user ${userId}: ${response.status} - ${errorMessage}`
      );
      return createDefaultUser(userId);
    }

    const userData = await response.json();
    console.log(`Fetched user data for ID ${userId}:`, userData); // Log the fetched user data
    return userData;
  } catch (error) {
    console.warn(`Error fetching user ${userId}:`, error.message);
    return createDefaultUser(userId);
  }
};

// Helper function to create a default user object
const createDefaultUser = (userId) => ({
  id: userId,
  first_name: "Unknown",
  last_name: "User",
});

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [users, setUsers] = useState({}); // Store user data

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }

      try {
        const data = await fetchAttendanceData(token);
        setAttendanceData(data);

        // Fetch user data for each attendance record
        const userPromises = data.map((record) =>
          fetchUserData(record.user_id, token)
        );

        const userData = await Promise.all(userPromises);

        // Combine user data into a map for easy access
        const userMap = {};
        userData.forEach((user) => {
          if (user && user.user_id) {
            userMap[user.user_id] = user;
          }
        });
        setUsers(userMap);

        console.log("User data map:", userMap);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally set some error state here
      }
    };

    getData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Attendance Records
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "No.",
                "Name",
                "Date",
                "Time In",
                "Break In",
                "Break Out",
                "Time Out",
                "Total Hours",
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
            {attendanceData
              .sort((a, b) => b.id - a.id) // Sort records by ID descending
              .map((record, index) => {
                const user = users[record.user_id] || {}; // Get user data
                const fullName = `${user.firstname || ""} ${
                  user.lastname || ""
                }`.trim(); // Combine names

                return (
                  <tr
                    key={`${record.id}-${index}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/dashboard/employees/${user.user_id}`}
                        className="text-sm text-text-header border-b border-dotted border-gray-400 hover:border-solid hover:border-blue-600 hover:text-blue-600"
                      >
                        {fullName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.time_in}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.break_in}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.break_out}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.time_out}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.total_hours}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
