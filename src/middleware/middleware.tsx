import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fungsi untuk memeriksa apakah token sudah kedaluwarsa
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || null;
  const refreshToken = req.cookies.get('refresh_token')?.value || null;

  // Jika token tidak ada atau kedaluwarsa
  if (!token || isTokenExpired(token)) {
    // Jika ada refresh token, cobalah memperbarui token
    if (refreshToken) {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.access_token) {
            // Simpan token baru ke cookie dan lanjutkan request
            const response = NextResponse.next();
            response.cookies.set('token', data.access_token, {
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              path: '/',
            });
            return response;
          }
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }

    // Redirect ke halaman login jika tidak ada akses
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Jika token valid, lanjutkan request
  return NextResponse.next();
}

// Config untuk middleware
export const config = {
  matcher: ['/cart', '/products'], // Lindungi path tertentu
};
