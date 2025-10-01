import { LoginForm } from "@/components/login-form"
import { Server } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-primary-foreground mx-auto mb-4">
            <Server className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold">InfraOps</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your infrastructure</p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-muted-foreground">Secure access to automated provisioning platform</p>
      </div>
    </div>
  )
}
