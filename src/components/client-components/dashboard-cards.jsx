"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { Users, CheckCircle, CalendarClock } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DashboardCards() {
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    async function fetchEmployeeCount() {
      try {
        const response = await fetchWithAuth("/api/user");
        console.log("API Response:", response);

        if (response) {
          console.log("Response length:", response.length);
          setTotalEmployees(response.length || 0);
        }
      } catch (err) {
        console.error("Error fetching employee count:", err);
      }
    }

    fetchEmployeeCount();
  }, []);

  return (
    <div className="grid gap-4 p-1 md:grid-cols-3">
      {/* Total Employees Card */}
      <Link href="/dashboard/employees">
        <Card className="p-6">
          <div className="flex gap-4">
            <div className="py-6">
              <Users className="w-8 h-8 text-blue-700" />
            </div>
            <div className="py-4 pl-4">
              <CardTitle>
                <h2 className="text-base font-bold">Total Employees</h2>
              </CardTitle>
              <p className="text-md font-bold">{totalEmployees}</p>
            </div>
          </div>
        </Card>
      </Link>

      {/* Present Today Card */}
      <Link href="#dashboard-charts" scroll={true}>
        <Card className="p-6">
          <div className="flex gap-4">
            <div className="py-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="py-4 pl-4">
              <CardTitle>
                <h2 className="text-base font-bold">Present Today</h2>
              </CardTitle>
              <p className="text-md font-bold">19 (100%)</p>
            </div>
          </div>
        </Card>
      </Link>

      {/* Pending Leaves Card */}
      <Link href="/dashboard/leaves" scroll={true}>
        <Card className="p-6">
          <div className="flex gap-4">
            <div className="py-6">
              <CalendarClock className="w-8 h-8 text-red-600" />
            </div>
            <div className="py-4 pl-4">
              <CardTitle>
                <h2 className="text-base font-bold">Pending Leave Requests</h2>
              </CardTitle>
              <p className="text-md font-bold">3</p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
