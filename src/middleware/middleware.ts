import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Dapatkan token dari cookies
  const token = req.cookies.get("authToken")?.value;

  console.log("Middleware executed for path:", req.nextUrl.pathname);
  console.log("Token exists:", !!token);

  // Daftar rute yang memerlukan autentikasi
  const protectedRoutes = ["/profile", "/cart", "/checkout"];

  // Periksa apakah rute saat ini adalah rute yang dilindungi
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  console.log("Is protected route:", isProtectedRoute);

  // Jika rute dilindungi dan tidak ada token, redirect ke halaman login
  if (isProtectedRoute && !token) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Jika pengguna sudah login dan mencoba mengakses halaman login atau register, redirect ke halaman utama
  if (
    token &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    console.log("Redirecting logged-in user to home page");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Lanjutkan ke rute berikutnya jika tidak ada redirect
  console.log("Proceeding to next middleware or page");
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/cart/:path*", "/login", "/register"],
};
