'use client'

import { Users, CheckCircle, ClipboardList } from "lucide-react"
import { Card, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DashboardCards() {
  return (
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
      <Link href="/dashboard/leaves">
        <Card className="p-6">
          <div className="flex gap-4">
            <div className="py-4">
              <ClipboardList className="w-8 h-8 text-red-700" />
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
  )
}