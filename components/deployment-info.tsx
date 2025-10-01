"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Clock, Download, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface DeploymentDetails {
  id: string
  environment: string
  action: string
  status: "success" | "failed" | "running"
  startedAt: string
  duration: string
  triggeredBy: string
  resources: number
}

export function DeploymentInfo({ deploymentId }: { deploymentId: string }) {
  const [deployment, setDeployment] = useState<DeploymentDetails | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDeployment = async () => {
      try {
        const response = await fetch(`/api/deployments/${deploymentId}`)
        if (response.ok) {
          const data = await response.json()
          setDeployment(data.deployment)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch deployment:", error)
      }
    }

    fetchDeployment()
  }, [deploymentId])

  const copyDeploymentId = () => {
    navigator.clipboard.writeText(deploymentId)
    toast({
      title: "Copied to clipboard",
      description: "Deployment ID copied successfully",
    })
  }

  if (!deployment) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          <p>Loading deployment information...</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = () => {
    switch (deployment.status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-chart-1" />
      case "failed":
        return <XCircle className="w-5 h-5 text-destructive" />
      case "running":
        return <Clock className="w-5 h-5 text-chart-2 animate-pulse" />
    }
  }

  const getStatusVariant = () => {
    switch (deployment.status) {
      case "success":
        return "default" as const
      case "failed":
        return "destructive" as const
      case "running":
        return "secondary" as const
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{deployment.environment}</h3>
                  <Badge variant="outline" className="capitalize">
                    {deployment.action}
                  </Badge>
                  <Badge variant={getStatusVariant()} className="capitalize">
                    {deployment.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Started {deployment.startedAt} • Duration: {deployment.duration}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Deployment ID</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-mono text-sm">{deployment.id}</p>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyDeploymentId}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Triggered By</p>
                <p className="font-medium text-sm mt-1">{deployment.triggeredBy}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Resources</p>
                <p className="font-medium text-sm mt-1">{deployment.resources} resources</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Environment</p>
                <p className="font-medium text-sm mt-1 capitalize">{deployment.environment}</p>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
