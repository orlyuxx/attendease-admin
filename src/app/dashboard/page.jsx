import DashboardDate from "@/components/client-components/dashboard-date"
import DashboardCards from "@/components/client-components/dashboard-cards"
import DashboardCharts from "@/components/client-components/dashboard-charts"

export default function DashboardPage() {
  return (
    <div className="space-y-6 py-4 mb-60">
      
      {/* Date and Time */}
      <div className="pl-2">
        <DashboardDate />
      </div>

      {/* Cards */}
      <DashboardCards />

      {/* Charts */}
      <div className="px-2">
        <DashboardCharts />
      </div>
    </div>
  )
}
