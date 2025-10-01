import { type NextRequest, NextResponse } from "next/server"

// Mock logs data
const mockLogs = [
  { timestamp: "14:30:01", level: "info" as const, message: "Initializing Terraform..." },
  { timestamp: "14:30:02", level: "info" as const, message: "Terraform v1.6.0 initialized" },
  { timestamp: "14:30:03", level: "info" as const, message: "Configuring AWS provider..." },
  { timestamp: "14:30:04", level: "success" as const, message: "AWS provider configured successfully" },
  { timestamp: "14:30:05", level: "info" as const, message: "Planning infrastructure changes..." },
  { timestamp: "14:30:08", level: "info" as const, message: "Plan: 12 to add, 0 to change, 0 to destroy" },
  { timestamp: "14:30:09", level: "info" as const, message: "Applying infrastructure changes..." },
  { timestamp: "14:30:12", level: "info" as const, message: "Creating EC2 instance (i-0abc123def456)..." },
  { timestamp: "14:30:45", level: "success" as const, message: "EC2 instance created successfully" },
  { timestamp: "14:30:46", level: "info" as const, message: "Creating RDS database..." },
  { timestamp: "14:31:20", level: "success" as const, message: "RDS database created successfully" },
  { timestamp: "14:31:21", level: "info" as const, message: "Configuring security groups..." },
  { timestamp: "14:31:25", level: "success" as const, message: "Security groups configured" },
  { timestamp: "14:31:26", level: "info" as const, message: "Setting up VPC networking..." },
  { timestamp: "14:31:35", level: "success" as const, message: "VPC networking configured" },
  { timestamp: "14:31:36", level: "info" as const, message: "Applying IAM policies..." },
  { timestamp: "14:31:40", level: "success" as const, message: "IAM policies applied successfully" },
  { timestamp: "14:31:41", level: "info" as const, message: "Running post-deployment scripts..." },
  { timestamp: "14:31:50", level: "success" as const, message: "Post-deployment scripts completed" },
  {
    timestamp: "14:31:51",
    level: "success" as const,
    message: "Apply complete! Resources: 12 added, 0 changed, 0 destroyed",
  },
  { timestamp: "14:31:52", level: "info" as const, message: "Deployment completed successfully" },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // In production, fetch actual logs from storage or streaming service
    return NextResponse.json({
      logs: mockLogs,
      deploymentId: params.id,
    })
  } catch (error) {
    console.error("[v0] Failed to fetch logs:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}
