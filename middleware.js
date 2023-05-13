import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
  // check if user is logged in
  // if not, redirect to login page
  // if yes, continue

  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get("token");
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(origin);
  } else {
    return NextResponse.next();
  }
}
