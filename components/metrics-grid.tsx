import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react"

const metrics = [
  {
    title: "Setup Time Saved",
    value: "93%",
    description: "2 days → 3 hours",
    icon: Clock,
    trend: "+93%",
  },
  {
    title: "Manual Steps Reduced",
    value: "90%",
    description: "Automated provisioning",
    icon: CheckCircle2,
    trend: "+90%",
  },
  {
    title: "Release Cycles",
    value: "65%",
    description: "Faster deployments",
    icon: TrendingUp,
    trend: "+65%",
  },
  {
    title: "Security Incidents",
    value: "0",
    description: "IAM least privilege",
    icon: AlertCircle,
    trend: "0",
  },
]

export function MetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-chart-1" />
                <span className="text-xs font-medium text-chart-1">{metric.trend}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
