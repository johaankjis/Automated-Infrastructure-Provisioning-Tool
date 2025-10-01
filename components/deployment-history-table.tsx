"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Clock, Eye, RotateCcw } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import Link from "next/link"

interface HistoryDeployment {
  id: string
  environment: string
  action: string
  status: "success" | "failed" | "running"
  startedAt: string
  duration: string
  triggeredBy: string
  resources: number
}

export function DeploymentHistoryTable() {
  const [deployments, setDeployments] = useState<HistoryDeployment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history")
        if (response.ok) {
          const data = await response.json()
          setDeployments(data.history)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-chart-1" />
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "running":
        return <Clock className="w-4 h-4 text-chart-2" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default" as const
      case "failed":
        return "destructive" as const
      case "running":
        return "secondary" as const
      default:
        return "secondary" as const
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <p>Loading deployment history...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Resources</TableHead>
              <TableHead>Triggered By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  No deployment history found
                </TableCell>
              </TableRow>
            ) : (
              deployments.map((deployment) => (
                <TableRow key={deployment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(deployment.status)}
                      <Badge variant={getStatusVariant(deployment.status)} className="capitalize">
                        {deployment.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{deployment.environment}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {deployment.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{deployment.startedAt}</TableCell>
                  <TableCell className="text-muted-foreground">{deployment.duration}</TableCell>
                  <TableCell className="text-muted-foreground">{deployment.resources} resources</TableCell>
                  <TableCell className="text-muted-foreground">{deployment.triggeredBy}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/logs/${deployment.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
