// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token"); // Replace with your actual auth logic
    

    // List of paths to protect
    const protectedPaths = ["/app", "/profile", "/settings"];

    const isProtectedRoute = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedRoute && !token) {
        const loginUrl = new URL("/auth", request.url); // Redirect to login page
        return NextResponse.redirect(loginUrl);
    }

    // Allow access to other routes
    return NextResponse.next();
}

// Match paths that require middleware
export const config = {
    matcher: ["/app/:path*", "/profile/:path*", "/settings/:path*"], // Add protected routes here
};
