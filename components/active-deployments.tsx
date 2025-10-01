"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle, Eye } from "lucide-react"
import { useEffect, useState } from "react"

interface Deployment {
  id: string
  environment: string
  action: string
  status: "running" | "success" | "failed"
  startedAt: string
  progress: number
}

export function ActiveDeployments() {
  const [deployments, setDeployments] = useState<Deployment[]>([])

  useEffect(() => {
    // Fetch active deployments
    const fetchDeployments = async () => {
      try {
        const response = await fetch("/api/deployments")
        if (response.ok) {
          const data = await response.json()
          setDeployments(data.deployments)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch deployments:", error)
      }
    }

    fetchDeployments()
    const interval = setInterval(fetchDeployments, 5000) // Poll every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Loader2 className="w-4 h-4 animate-spin text-chart-2" />
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-chart-1" />
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "running":
        return "secondary" as const
      case "success":
        return "default" as const
      case "failed":
        return "destructive" as const
      default:
        return "secondary" as const
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Deployments</CardTitle>
        <CardDescription>Monitor running and recent deployments</CardDescription>
      </CardHeader>
      <CardContent>
        {deployments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No active deployments</p>
            <p className="text-sm mt-1">Start a new deployment to see it here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {deployments.map((deployment) => (
              <div
                key={deployment.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50"
              >
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(deployment.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{deployment.environment}</p>
                      <Badge variant="outline" className="text-xs capitalize">
                        {deployment.action}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{deployment.startedAt}</p>
                    {deployment.status === "running" && (
                      <div className="mt-2">
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${deployment.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{deployment.progress}% complete</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(deployment.status)} className="capitalize">
                    {deployment.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
