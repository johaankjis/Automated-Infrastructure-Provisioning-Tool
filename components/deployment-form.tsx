"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Play, Trash2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DeploymentForm() {
  const [environment, setEnvironment] = useState("")
  const [action, setAction] = useState<"provision" | "destroy">("provision")
  const [variables, setVariables] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDeploy = async () => {
    if (!environment) {
      toast({
        title: "Environment required",
        description: "Please select an environment to deploy",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          environment,
          action,
          variables: variables || undefined,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: action === "provision" ? "Provisioning started" : "Destroy started",
          description: `Deployment ${data.deploymentId} is now running`,
        })
      } else {
        throw new Error(data.error || "Deployment failed")
      }
    } catch (error) {
      toast({
        title: "Deployment failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Deployment</CardTitle>
        <CardDescription>Configure and trigger infrastructure deployment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="environment">Environment</Label>
          <Select value={environment} onValueChange={setEnvironment}>
            <SelectTrigger id="environment">
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="action">Action</Label>
          <Select value={action} onValueChange={(v) => setAction(v as "provision" | "destroy")}>
            <SelectTrigger id="action">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="provision">Provision Infrastructure</SelectItem>
              <SelectItem value="destroy">Destroy Infrastructure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="variables">Terraform Variables (Optional)</Label>
          <Textarea
            id="variables"
            placeholder='{"instance_type": "t3.micro", "region": "us-east-1"}'
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
            className="font-mono text-sm"
            rows={4}
          />
          <p className="text-xs text-muted-foreground">Enter variables as JSON format</p>
        </div>

        <Button
          onClick={handleDeploy}
          disabled={isLoading}
          className="w-full"
          variant={action === "destroy" ? "destructive" : "default"}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : action === "provision" ? (
            <>
              <Play className="w-4 h-4 mr-2" />
              Provision Infrastructure
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4 mr-2" />
              Destroy Infrastructure
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
