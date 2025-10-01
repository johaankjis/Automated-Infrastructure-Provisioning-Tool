import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

const deployments = [
  {
    id: 1,
    environment: "Production",
    status: "success",
    timestamp: "2 hours ago",
    duration: "3m 24s",
  },
  {
    id: 2,
    environment: "Staging",
    status: "success",
    timestamp: "5 hours ago",
    duration: "2m 56s",
  },
  {
    id: 3,
    environment: "Development",
    status: "in-progress",
    timestamp: "Just now",
    duration: "1m 12s",
  },
  {
    id: 4,
    environment: "Production",
    status: "failed",
    timestamp: "1 day ago",
    duration: "4m 02s",
  },
]

const statusConfig = {
  success: {
    icon: CheckCircle2,
    variant: "default" as const,
    color: "text-chart-1",
  },
  "in-progress": {
    icon: Clock,
    variant: "secondary" as const,
    color: "text-chart-2",
  },
  failed: {
    icon: XCircle,
    variant: "destructive" as const,
    color: "text-destructive",
  },
}

export function RecentDeployments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Deployments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deployments.map((deployment) => {
            const config = statusConfig[deployment.status as keyof typeof statusConfig]
            const Icon = config.icon

            return (
              <div
                key={deployment.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <div>
                    <p className="font-medium">{deployment.environment}</p>
                    <p className="text-sm text-muted-foreground">
                      {deployment.timestamp} • {deployment.duration}
                    </p>
                  </div>
                </div>
                <Badge variant={config.variant} className="capitalize">
                  {deployment.status}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
