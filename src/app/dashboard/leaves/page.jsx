"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Modal from "react-modal";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

export default function LeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [users, setUsers] = useState({});
  const [leaveTypes, setLeaveTypes] = useState({});
  const [passSlips, setPassSlips] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [leaveTypeList, setLeaveTypeList] = useState([]);
  const [newLeaveType, setNewLeaveType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        // Fetch all required data in parallel
        const [leavesRes, usersRes, leaveTypesRes, passSlipsRes] =
          await Promise.all([
            fetch("http://attendease-backend.test/api/leave", { headers }),
            fetch("http://attendease-backend.test/api/user", { headers }),
            fetch("http://attendease-backend.test/api/leavetype", { headers }),
            fetch("http://attendease-backend.test/api/passslip", { headers }),
          ]);

        // Check if responses are ok
        if (
          !leavesRes.ok ||
          !usersRes.ok ||
          !leaveTypesRes.ok ||
          !passSlipsRes.ok
        ) {
          throw new Error("Network response was not ok");
        }

        const leavesData = await leavesRes.json();
        const usersData = await usersRes.json();
        const leaveTypesData = await leaveTypesRes.json();
        const passSlipsData = await passSlipsRes.json();

        // console.log("Raw Users Data:", usersData);
        // console.log("Raw Leave Types Data:", leaveTypesData);

        // Create lookup objects
        const userMap = {};
        usersData.forEach((user) => {
          userMap[user.user_id] = `${user.firstname} ${user.lastname}`;
        });

        const leaveTypeMap = {};
        leaveTypesData.forEach((type) => {
          leaveTypeMap[type.leave_type_id] = type.leave_name;
        });

        // console.log("User Map:", userMap);
        // console.log("Leave Type Map:", leaveTypeMap);
        // console.log("Leaves Data:", leavesData);

        setLeaves(leavesData);
        setUsers(userMap);
        setLeaveTypes(leaveTypeMap);
        setPassSlips(passSlipsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await fetch(
          "http://attendease-backend.test/api/leavetype",
          { headers }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setLeaveTypeList(data);
      } catch (error) {
        console.error("Error fetching leave types:", error);
      }
    };

    fetchLeaveTypes();
  }, []);

  // console.log("Leaves Data:", leaves);
  // console.log("Users Data:", users);
  // console.log("Leave Types Data:", leaveTypes);

  const openModal = (leave) => {
    setSelectedLeave(leave);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedLeave(null);
    setModalIsOpen(false);
  };

  const handleApprove = async (id, isPassSlip = false) => {
    try {
      const url = isPassSlip
        ? `http://attendease-backend.test/api/passslip/approve/${id}`
        : `http://attendease-backend.test/api/leave/approve/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleReject = async (id, isPassSlip = false) => {
    try {
      const url = isPassSlip
        ? `http://attendease-backend.test/api/passslip/reject/${id}`
        : `http://attendease-backend.test/api/leave/reject/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  const handleDelete = async (id, isPassSlip = false) => {
    try {
      const url = isPassSlip
        ? `http://attendease-backend.test/api/passslip/${id}`
        : `http://attendease-backend.test/api/leave/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleAddLeaveType = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(
        "http://attendease-backend.test/api/leavetype",
        {
          method: "POST",
          headers,
          body: JSON.stringify({ leave_name: newLeaveType }),
        }
      );
      if (response.ok) {
        setNewLeaveType("");
        const updatedResponse = await fetch(
          "http://attendease-backend.test/api/leavetype",
          { headers }
        );
        const updatedData = await updatedResponse.json();
        setLeaveTypeList(updatedData);
      }
    } catch (error) {
      console.error("Error adding leave type:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold text-gray-800 mb-6">Leave Requests</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaves.map((leave, index) => {
              console.log(leave);
              return (
                <tr
                  key={`${leave.user_id}-${leave.leave_start}-${index}`}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => openModal(leave)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {users[leave.user_id] || "Unknown User"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leaveTypes[leave.leave_type_id] || "Unknown Leave Type"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(leave.leave_start).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(leave.leave_end).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {leave.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leave.number_of_days}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        leave.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : leave.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent modal from opening
                        handleApprove(leave.leave_id);
                      }}
                      className="text-green-600 hover:text-green-900"
                      title="Approve"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(leave.leave_id);
                      }}
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Reject"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(leave.leave_id);
                      }}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-20">
        <div className="w-1/2 p-4">
          <h2 className="text-lg text-text-header font-bold mb-4">
            Types of Leaves
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveTypeList.map((leaveType, index) => (
                <tr key={leaveType.leave_type_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leaveType.leave_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-lg text-text-header font-bold mb-4">
            Add a New Type of Leave
          </h2>
          <form onSubmit={handleAddLeaveType}>
            <input
              type="text"
              value={newLeaveType}
              onChange={(e) => setNewLeaveType(e.target.value)}
              placeholder="Leave Type Name"
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 w-full"
            >
              Add Leave Type
            </button>
          </form>
        </div>
      </div>

      <h1 className="text-lg font-bold text-text-header mt-20 mb-6">
        Pass Slips
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow mb-32">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pass Slip Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {passSlips.map((passSlip, index) => (
              <tr
                key={passSlip.pass_slip_id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {users[passSlip.user_id] || "Unknown User"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {passSlip.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(passSlip.time_out).toLocaleTimeString("en-US")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {passSlip.time_in
                    ? new Date(passSlip.time_in).toLocaleTimeString("en-US")
                    : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <img
                    src={passSlip.pass_slip_image}
                    alt="Pass Slip"
                    className="h-10 w-10 object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      passSlip.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : passSlip.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {passSlip.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(passSlip.pass_slip_id, true);
                    }}
                    className="text-green-600 hover:text-green-900"
                    title="Approve"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(passSlip.pass_slip_id, true);
                    }}
                    className="text-yellow-600 hover:text-yellow-900"
                    title="Reject"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(passSlip.pass_slip_id, true);
                    }}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
