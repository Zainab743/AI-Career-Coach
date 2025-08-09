// middleware.js
import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

// Optional: you can delete the config block entirely.
// If you keep it, the middleware will still run on these routes, but do nothing.
