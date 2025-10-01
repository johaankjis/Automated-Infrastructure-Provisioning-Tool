import { NextResponse } from "next/server"

// Mock data for deployments (this would come from your database or state management)
const mockDeployments = [
  {
    id: "deploy-1",
    environment: "staging",
    action: "provision",
    status: "running" as const,
    startedAt: "2 minutes ago",
    progress: 65,
  },
  {
    id: "deploy-2",
    environment: "production",
    action: "provision",
    status: "success" as const,
    startedAt: "1 hour ago",
    progress: 100,
  },
]

export async function GET() {
  try {
    // In production, fetch from database or state management
    return NextResponse.json({
      deployments: mockDeployments,
    })
  } catch (error) {
    console.error("[v0] Failed to fetch deployments:", error)
    return NextResponse.json({ error: "Failed to fetch deployments" }, { status: 500 })
  }
}
