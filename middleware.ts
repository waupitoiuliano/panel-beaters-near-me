import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Redirect all traffic to maintenance page except /admin and /login
  const pathname = request.nextUrl.pathname;

  // Allow admin and login pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/maintenance')) {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          },
          remove(name: string, options: any) {
            request.cookies.delete(name);
            response.cookies.delete(name);
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (pathname.startsWith('/admin') && !user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    return response;
  }

  // Redirect everything else to maintenance
  const url = request.nextUrl.clone();
  url.pathname = '/maintenance';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

