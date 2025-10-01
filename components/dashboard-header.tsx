"use client"

import { Button } from "@/components/ui/button"
import { Server, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function DashboardHeader() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      localStorage.removeItem("auth_token")
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      })
      router.push("/login")
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">InfraOps</h2>
            <p className="text-xs text-muted-foreground">Automated Provisioning</p>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/deploy">
            <Button variant="ghost" size="sm">
              Deploy
            </Button>
          </Link>
          <Link href="/history">
            <Button variant="ghost" size="sm">
              History
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
