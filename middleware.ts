import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface UserData {
  client_id: string;
}

export function middleware(request: NextRequest) {
  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/register', '/forgot-password'];
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // Si es una ruta pública, permitir el acceso
  if (isPublicPath) {
    return NextResponse.next();
  }

  const userDataStr = request.cookies.get('user_data')?.value;
  
  // Si no hay datos de usuario y no es una ruta pública, redirigir a login
  if (!userDataStr) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si estamos en la raíz y hay datos de usuario, redirigir al dashboard
  if (request.nextUrl.pathname === '/') {
    const userData: UserData = JSON.parse(userDataStr);
    return NextResponse.redirect(new URL(`/dashboard/${userData.client_id}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 