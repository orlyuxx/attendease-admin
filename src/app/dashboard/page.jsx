import DashboardDate from "@/components/client-components/dashboard-date";
import DashboardCards from "@/components/client-components/dashboard-cards";
import DashboardCharts from "@/components/client-components/dashboard-charts";

export default function DashboardPage() {
  return (
    <div className="space-y-6 py-2 mb-10">
      {/* Date and Time */}
      <div className="pl-2">
        <DashboardDate />
      </div>

      {/* Cards */}
      <div>
        <DashboardCards />
      </div>

      {/* Charts */}
      <div>
        <DashboardCharts />
      </div>
    </div>
  );
}
