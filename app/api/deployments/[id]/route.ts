import { type NextRequest, NextResponse } from "next/server"

// Mock deployment details
const mockDeployment = {
  id: "deploy-001",
  environment: "production",
  action: "provision",
  status: "success" as const,
  startedAt: "2024-01-15 14:30:00",
  duration: "3m 24s",
  triggeredBy: "john.doe@company.com",
  resources: 12,
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // In production, fetch from database
    return NextResponse.json({
      deployment: { ...mockDeployment, id: params.id },
    })
  } catch (error) {
    console.error("[v0] Failed to fetch deployment:", error)
    return NextResponse.json({ error: "Failed to fetch deployment" }, { status: 500 })
  }
}
