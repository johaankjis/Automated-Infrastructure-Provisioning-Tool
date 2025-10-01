import { NextResponse } from "next/server"

// Mock deployment history data
const mockHistory = [
  {
    id: "deploy-001",
    environment: "production",
    action: "provision",
    status: "success" as const,
    startedAt: "2024-01-15 14:30:00",
    duration: "3m 24s",
    triggeredBy: "john.doe@company.com",
    resources: 12,
  },
  {
    id: "deploy-002",
    environment: "staging",
    action: "provision",
    status: "success" as const,
    startedAt: "2024-01-15 12:15:00",
    duration: "2m 56s",
    triggeredBy: "jane.smith@company.com",
    resources: 8,
  },
  {
    id: "deploy-003",
    environment: "development",
    action: "destroy",
    status: "success" as const,
    startedAt: "2024-01-15 10:45:00",
    duration: "1m 42s",
    triggeredBy: "john.doe@company.com",
    resources: 5,
  },
  {
    id: "deploy-004",
    environment: "production",
    action: "provision",
    status: "failed" as const,
    startedAt: "2024-01-14 16:20:00",
    duration: "4m 12s",
    triggeredBy: "deploy-bot",
    resources: 0,
  },
  {
    id: "deploy-005",
    environment: "staging",
    action: "provision",
    status: "success" as const,
    startedAt: "2024-01-14 14:00:00",
    duration: "3m 08s",
    triggeredBy: "jane.smith@company.com",
    resources: 8,
  },
  {
    id: "deploy-006",
    environment: "production",
    action: "provision",
    status: "success" as const,
    startedAt: "2024-01-14 09:30:00",
    duration: "3m 45s",
    triggeredBy: "john.doe@company.com",
    resources: 12,
  },
  {
    id: "deploy-007",
    environment: "development",
    action: "provision",
    status: "success" as const,
    startedAt: "2024-01-13 15:20:00",
    duration: "2m 18s",
    triggeredBy: "jane.smith@company.com",
    resources: 5,
  },
  {
    id: "deploy-008",
    environment: "staging",
    action: "destroy",
    status: "success" as const,
    startedAt: "2024-01-13 11:00:00",
    duration: "1m 55s",
    triggeredBy: "deploy-bot",
    resources: 8,
  },
]

export async function GET() {
  try {
    // In production, fetch from database with pagination and filtering
    return NextResponse.json({
      history: mockHistory,
      total: mockHistory.length,
    })
  } catch (error) {
    console.error("[v0] Failed to fetch history:", error)
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 })
  }
}
