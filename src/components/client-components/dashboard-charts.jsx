"use client";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import MonthSelector from "@/components/client-components/month-selector";

export default function DashboardCharts() {
  // Initialize the selectedMonth state with current month
  const [selectedMonth, setSelectedMonth] = useState(() => {
    return new Date().toLocaleString("default", { month: "long" });
  });

  const pieData = [
    { name: "Present", value: 45, color: "#4CAF50" },
    { name: "Late", value: 5, color: "#FFC107" },
    { name: "Absent", value: 3, color: "#F44336" },
  ];

  const recentLogs = [
    { id: 1, name: "John Doe", time: "9:04 AM", status: "Late" },
    { id: 2, name: "Jane Smith", time: "8:56 AM", status: "On Time" },
    { id: 3, name: "Mike Brown", time: "8:53 AM", status: "On Time" },
    { id: 4, name: "Sara Wilson", time: "8:49 AM", status: "On Time" },
  ];

  // Get current month's days
  const getDaysInMonth = () => {
    const now = new Date();
    const monthIndex = new Date(
      Date.parse(`${selectedMonth} 1, 2024`)
    ).getMonth();
    const year = now.getFullYear();

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // Get the number of days in the month

    // Generate data for the month
    const data = Array.from({ length: daysInMonth }, (_, day) => {
      const currentDay = day + 1; // Days are 1-indexed
      if (monthIndex === 10) {
        // November
        return {
          day: currentDay,
          fullDate: new Date(year, monthIndex, currentDay),
          Present: 10, // Example data
          Absent: 8,
          OnLeave: 1,
        };
      } else if (monthIndex === 11) {
        // December
        if (currentDay === 1) {
          return {
            day: currentDay,
            fullDate: new Date(year, monthIndex, currentDay),
            Present: 15,
            Absent: 3,
            OnLeave: 1,
          };
        } else if (currentDay === 2) {
          return {
            day: currentDay,
            fullDate: new Date(year, monthIndex, currentDay),
            Present: 12,
            Absent: 5,
            OnLeave: 2,
          };
        }
        return {
          day: currentDay,
          fullDate: new Date(year, monthIndex, currentDay),
          Present: 0,
          Absent: 0,
          OnLeave: 0,
        };
      }
      // For other months, return zero data
      return {
        day: currentDay,
        fullDate: new Date(year, monthIndex, currentDay),
        Present: 0,
        Absent: 0,
        OnLeave: 0,
      };
    });

    return data;
  };

  const monthlyData = getDaysInMonth();

  return (
    <div className="space-y-6 p-1">
      {/* Your existing pie chart and recent logs grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pie Chart */}
        <Card className="p-4">
          <CardTitle className="text-md font-semibold text-[#09090b] mb-4">
            Today's Attendance Overview
          </CardTitle>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "14px",
                    minWidth: "150px", // Slightly smaller than bar chart tooltip
                  }}
                  itemStyle={{
                    color: "#71717A",
                    padding: "4px 0",
                    fontSize: "13px",
                  }}
                  formatter={(value, name) => [`${value} employees`, name]}
                  wrapperStyle={{
                    outline: "none",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-[#71717A]">{entry.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Logs */}
        <Card className="p-4">
          <CardTitle className="text-md font-semibold text-[#09090b] mb-4">
            Recent Logs
          </CardTitle>
          <div className="space-y-4">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium text-[#09090b]">
                    {log.name}
                  </p>
                  <p className="text-xs text-[#71717A]">{log.time}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    log.status === "On Time"
                      ? "bg-green-200 text-green-800"
                      : log.status === "Late"
                      ? "bg-red-200 text-red-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {log.status}
                </span>
              </div>
            ))}

            <Link
              href="/dashboard/attendance"
              className="inline-block mt-4 pt-16"
            >
              <p className="text-sm font-semibold underline hover:text-[#09090b] transition-colors duration-200">
                view all
              </p>
            </Link>
          </div>
        </Card>
      </div>

      {/* Monthly Attendance Dashboard */}
      <Card className="p-4 pb-8">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-lg font-semibold text-[#09090b]">
            Monthly Attendance Overview
          </CardTitle>
          <MonthSelector
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 30,
                right: 40,
                left: 40,
                bottom: 20,
              }}
              barSize={20}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                label={{
                  value: "Days of Month",
                  position: "insideBottom",
                  offset: -10,
                  style: {
                    fill: "#71717A", // matching your color theme
                    fontSize: "14px",
                    paddingTop: "20px", // Added padding top
                    marginTop: "10px",
                  },
                }}
                padding={{ left: 10, right: 10 }}
                tick={{ margin: 10 }}
              />
              <YAxis
                label={{
                  value: "Number of Employees",
                  angle: -90,
                  position: "insideLeft",
                  offset: -10,
                  style: {
                    textAnchor: "middle",
                    fill: "#71717A", // matching your color theme
                    fontSize: "14px",
                  },
                }}
                tick={{
                  margin: 10,
                  fontSize: "12px",
                  fill: "#71717A", // matching your color theme
                }}
                tickLine={false} // optional: removes the tick lines
                axisLine={{ stroke: "#E5E7EB" }} // optional: styles the main axis line
                dx={-10} // adds some padding between numbers and axis
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "14px",
                  minWidth: "200px", // Set minimum width
                }}
                labelStyle={{
                  color: "#09090b",
                  fontWeight: 600,
                  marginBottom: "8px",
                  fontSize: "14px",
                }}
                itemStyle={{
                  color: "#71717A",
                  padding: "4px 0",
                  fontSize: "13px",
                }}
                labelFormatter={(_, payload) => {
                  if (payload && payload.length > 0) {
                    const date = payload[0].payload.fullDate;
                    return date.toLocaleDateString("default", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }
                  return "";
                }}
                formatter={(value, name) => [`${value} employees`, name]}
                wrapperStyle={{
                  outline: "none", // Removes the default outline
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                margin={{ top: 10, bottom: 10 }}
                iconType="circle"
                iconSize={12}
                wrapperStyle={{
                  paddingBottom: "20px",
                }}
                formatter={(value) => (
                  <span className="text-sm ml-2 text-[#71717A]">{value}</span>
                )}
              />
              <Bar
                dataKey="Present"
                fill="#4CAF50"
                legendType="circle"
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Bar
                dataKey="Late"
                fill="#FFC107"
                legendType="circle"
                animationBegin={200}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Bar
                dataKey="Absent"
                fill="#F44336"
                legendType="circle"
                animationBegin={400}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
