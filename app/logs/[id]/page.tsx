import { DashboardHeader } from "@/components/dashboard-header"
import { LogsViewer } from "@/components/logs-viewer"
import { DeploymentInfo } from "@/components/deployment-info"

export default function LogsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">Deployment Logs</h1>
          <p className="text-muted-foreground mt-2 text-lg">Real-time logs and output from Terraform</p>
        </div>

        <DeploymentInfo deploymentId={params.id} />
        <LogsViewer deploymentId={params.id} />
      </main>
    </div>
  )
}
