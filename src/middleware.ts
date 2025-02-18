import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: '/sign-in', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
] as const
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'

async function validExpiresToken() {
  const getCookies = cookies()
  const token = (await getCookies).get('auth_token')?.value || ''

  try {
    if (!!token) {
      const decodeToken = jwt.decode(token) as JwtPayload
      const currentTime = Math.floor(Date.now() / 1000)

      if (decodeToken.exp! < currentTime) {
        return false
      } else {
        return true
      }
    }

    return false
  } catch (error) {
    console.log(error)
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)

  const tokenIsValid = await validExpiresToken()
  const authToken = tokenIsValid

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
