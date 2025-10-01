import { DashboardHeader } from "@/components/dashboard-header"
import { DeploymentForm } from "@/components/deployment-form"
import { ActiveDeployments } from "@/components/active-deployments"

export default function DeployPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">Deployment Management</h1>
          <p className="text-muted-foreground mt-2 text-lg">Provision or destroy infrastructure with Terraform</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <DeploymentForm />
          <ActiveDeployments />
        </div>
      </main>
    </div>
  )
}
