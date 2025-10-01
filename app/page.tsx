import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsGrid } from "@/components/metrics-grid"
import { InfrastructureStatus } from "@/components/infrastructure-status"
import { RecentDeployments } from "@/components/recent-deployments"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">Infrastructure Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Monitor and manage your AWS infrastructure deployments</p>
        </div>

        <MetricsGrid />

        <div className="grid gap-8 lg:grid-cols-2">
          <InfrastructureStatus />
          <RecentDeployments />
        </div>
      </main>
    </div>
  )
}
