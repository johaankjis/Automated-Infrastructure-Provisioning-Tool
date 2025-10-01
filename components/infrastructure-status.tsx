import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Database, Network, Shield } from "lucide-react"

const resources = [
  {
    name: "EC2 Instances",
    status: "running",
    count: 3,
    icon: Server,
  },
  {
    name: "RDS Database",
    status: "running",
    count: 1,
    icon: Database,
  },
  {
    name: "VPC Network",
    status: "running",
    count: 1,
    icon: Network,
  },
  {
    name: "Security Groups",
    status: "configured",
    count: 5,
    icon: Shield,
  },
]

export function InfrastructureStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Infrastructure Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <div
                key={resource.name}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-background">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{resource.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {resource.count} {resource.count === 1 ? "resource" : "resources"}
                    </p>
                  </div>
                </div>
                <Badge variant={resource.status === "running" ? "default" : "secondary"} className="capitalize">
                  {resource.status}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
