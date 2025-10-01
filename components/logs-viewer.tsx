"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal, Pause, Play, Trash2 } from "lucide-react"
import { useEffect, useState, useRef } from "react"

interface LogEntry {
  timestamp: string
  level: "info" | "warning" | "error" | "success"
  message: string
}

export function LogsViewer({ deploymentId }: { deploymentId: string }) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/api/logs/${deploymentId}`)
        if (response.ok) {
          const data = await response.json()
          setLogs(data.logs)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch logs:", error)
      }
    }

    fetchLogs()
    const interval = setInterval(fetchLogs, 2000) // Poll every 2 seconds

    return () => clearInterval(interval)
  }, [deploymentId])

  useEffect(() => {
    if (isAutoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, isAutoScroll])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "text-chart-2"
      case "warning":
        return "text-chart-3"
      case "error":
        return "text-destructive"
      case "success":
        return "text-chart-1"
      default:
        return "text-foreground"
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return "secondary" as const
      case "warning":
        return "outline" as const
      case "error":
        return "destructive" as const
      case "success":
        return "default" as const
      default:
        return "secondary" as const
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            <CardTitle>Terraform Output</CardTitle>
            <Badge variant="secondary">{logs.length} lines</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoScroll(!isAutoScroll)}
              className={isAutoScroll ? "bg-primary/10" : ""}
            >
              {isAutoScroll ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              Auto-scroll
            </Button>
            <Button variant="outline" size="sm" onClick={() => setLogs([])}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px] w-full" ref={scrollRef}>
          <div className="p-4 font-mono text-sm space-y-1 bg-muted/30">
            {logs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No logs available yet</p>
                <p className="text-xs mt-1">Logs will appear here as the deployment progresses</p>
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 py-1 hover:bg-muted/50 px-2 rounded">
                  <span className="text-muted-foreground text-xs shrink-0 w-20">{log.timestamp}</span>
                  <Badge variant={getLevelBadge(log.level)} className="shrink-0 text-xs uppercase">
                    {log.level}
                  </Badge>
                  <span className={`flex-1 ${getLevelColor(log.level)}`}>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
