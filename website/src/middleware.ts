import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { USER_ROLE } from "./lib/constant";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (nextUrl.pathname.startsWith("/sign-in") || nextUrl.pathname.startsWith("/register")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (nextUrl.pathname.startsWith("/admin")) {
    if (!token || token?.user?.user_role !== USER_ROLE.ADMIN) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/sign-in", "/register"],
};
