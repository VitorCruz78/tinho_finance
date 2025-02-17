import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import api from "./lib/axios";

const publicRoutes = [
  { path: '/sign-in', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
] as const
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'

async function validExpiresToken() {
  const getCookies = cookies()
  const nextAuthSession = (await getCookies).get('auth_token')?.value || ''
  const token = nextAuthSession?.split('Bearer ')[1]

  try {
    if (!!token) {
      const resValidToken: { expired: boolean, token: string } = (await api.get('/api/auth/validToken', {
        headers: {
          Authorization: token
        }
      })).data?.data

      return {
        expired: resValidToken?.expired,
        token: resValidToken?.token,
      }
    }

    return
  } catch (error) {
    console.log(error)
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)

  const tokenIsValid = await validExpiresToken()
  const authToken = tokenIsValid?.expired ? '' : tokenIsValid?.token

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
