import { NextRequest, NextResponse } from "next/server";

const locales = ["pt", "en"];

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("Accept-Language");

  if (acceptLanguage) {
    const preferred = acceptLanguage.split(",")[0].split("-")[0];

    if (locales.includes(preferred)) return preferred;
  }

  return "pt";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.match(/\.(.*)$/)) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|public|api|admin).*)"],
};
