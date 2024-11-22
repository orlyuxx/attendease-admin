import React from "react";
import { Users, CheckCircle, AlertTriangle } from "lucide-react"; // Icons
import { Card, CardTitle } from "@/components/ui/card"; // ShadCN components
import Link from "next/link";
import DateTimeDisplay from "@/components/client-components/current-date";
import DashboardCharts from "@/components/client-components/dashboard-charts";

export default function DashboardPage() {

  return (
    <div className="space-y-6 py-4 mb-60">
      {/* Date and Time */}
      <div className="pl-2">
        <DateTimeDisplay />
      </div>

      {/* Cards */}
      <div className="grid gap-4 p-1 px-2 md:grid-cols-3">

        {/* Total Employees Card */}
        <Link href="/dashboard/employees">
        <Card className="p-6">
          <div className="flex gap-4">
            <div className="py-6">
            <Users className="w-8 h-8 text-blue-700" />
            </div>
            <div className="py-4 pl-4">
              <CardTitle>
                <h2 className="text-lg font-semibold">
                Total Employees
                </h2>
                </CardTitle>
              <p className="text-md font-bold">50</p>
            </div>
          </div>
        </Card>
        </Link>

        {/* Attendance Today Card */}
        <Link href="#dashboard-charts" scroll={true}>
        <Card className="p-6">
          <div className="flex gap-4">
            <div className="py-4">
              <CheckCircle className="w-8 h-8 text-green-700" />
            </div>
            <div className="py-4 pl-4">
              <CardTitle>
                <h2 className="text-lg font-semibold">
                Present Today
                </h2>
              </CardTitle>
              <p className="text-md font-bold">45 (85%)</p>
            </div>
          </div>
        </Card>
        </Link>

        {/* Violations Today Card */}
        <Link href="/dashboard/leaves" scroll={true}>
        <Card className="p-6">
          <div className="flex gap-4">
            <div className="py-4">
              <AlertTriangle className="w-8 h-8 text-red-700" />
            </div>
            <div className="py-4 pl-4">
              <CardTitle>
                <h2 className="text-lg font-semibold">
                  Pending Leave Requests
                </h2>
              </CardTitle>
              <p className="text-md font-bold">3</p>
            </div>
          </div>
        </Card>
        </Link>

      </div>

      <DashboardCharts />

    </div>
  );
}
