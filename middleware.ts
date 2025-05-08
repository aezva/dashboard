import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface UserData {
  client_id: string;
}

export function middleware(request: NextRequest) {
  const userDataStr = request.cookies.get('user_data')?.value;
  
  if (!userDataStr) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userData: UserData = JSON.parse(userDataStr);
  return NextResponse.redirect(new URL(`/dashboard/${userData.client_id}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 