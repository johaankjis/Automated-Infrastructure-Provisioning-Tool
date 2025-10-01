import { DashboardHeader } from "@/components/dashboard-header"
import { DeploymentHistoryTable } from "@/components/deployment-history-table"
import { HistoryFilters } from "@/components/history-filters"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">Deployment History</h1>
          <p className="text-muted-foreground mt-2 text-lg">View and analyze past infrastructure deployments</p>
        </div>

        <HistoryFilters />
        <DeploymentHistoryTable />
      </main>
    </div>
  )
}
