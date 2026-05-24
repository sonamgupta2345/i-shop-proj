// middleware.js
import { NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/checkout', '/profile'];
const AUTH_ROUTES = ['/login', '/register', '/verify-otp'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('jwt')?.value || null;

  
  if (PROTECTED_ROUTES.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  
  if (AUTH_ROUTES.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout', '/profile', '/login', '/register', '/verify-otp'],
};