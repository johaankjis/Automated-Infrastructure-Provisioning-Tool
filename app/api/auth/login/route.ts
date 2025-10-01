import { type NextRequest, NextResponse } from "next/server"

// Mock user database (replace with actual database in production)
const users = [
  {
    email: "john.doe@company.com",
    password: "admin123", // In production, use hashed passwords
    name: "John Doe",
    role: "admin",
  },
  {
    email: "jane.smith@company.com",
    password: "user123",
    name: "Jane Smith",
    role: "user",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate token (in production, use JWT or session management)
    const token = Buffer.from(`${user.email}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
