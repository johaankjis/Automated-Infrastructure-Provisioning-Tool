import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value || request.headers.get("authorization")

  // Public routes that don't require authentication
  const publicRoutes = ["/login"]
  const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check for auth token (in production, validate JWT)
  // For now, we'll allow all requests since we're using localStorage
  // In production, implement proper session/JWT validation

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
