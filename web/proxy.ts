import { ENDPOINTS } from '@static/enpoints'
import { jwtDecode } from 'jwt-decode'
import { RequestCookies, ResponseCookies } from 'next/dist/server/web/spec-extension/cookies'
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/', '/login', '/register']
const HOMEPAGE_PATH = '/dashboard'

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp: number }>(token)
    return decoded.exp * 1000 < Date.now() + 10_000
  } catch {
    return true
  }
}

function redirectHome(request: NextRequest): NextResponse {
  const redirectResponse = NextResponse.redirect(new URL('/', request.url))
  redirectResponse.cookies.delete('access_token')
  redirectResponse.cookies.delete('refresh_token')
  return redirectResponse
}

export default async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  const isPublicPath = PUBLIC_PATHS.includes(request.nextUrl.pathname)

  if (accessToken && !isTokenExpired(accessToken)) {
    if (isPublicPath) {
      return NextResponse.redirect(new URL(HOMEPAGE_PATH, request.url))
    }
    return NextResponse.next()
  }

  if (!refreshToken) {
    if (isPublicPath) {
      return NextResponse.next()
    }
    return redirectHome(request)
  }

  try {
    const refreshResponse = await fetch(
      `http://${process.env.NEXT_PUBLIC_DEV_ENDPOINT}/${ENDPOINTS.REFRESH}`,
      {
        method: 'POST',
        headers: {
          cookie: request.headers.get('cookie') ?? '',
        },
      },
    )

    if (!refreshResponse.ok) {
      return isPublicPath ? NextResponse.next() : redirectHome(request)
    }

    const setCookieHeaders = refreshResponse.headers.getSetCookie?.() ?? []
    const cookieCarrier = new NextResponse()
    for (const cookie of setCookieHeaders) {
      cookieCarrier.headers.append('set-cookie', cookie)
    }

    const responseCookies = new ResponseCookies(cookieCarrier.headers)

    const newRequestHeaders = new Headers(request.headers)
    const newRequestCookies = new RequestCookies(newRequestHeaders)
    responseCookies.getAll().forEach((cookie) => newRequestCookies.set(cookie))

    const updatedRequest = new NextRequest(request.url, {
      ...request,
      headers: newRequestHeaders,
    })

    const nextResponse = isPublicPath
      ? NextResponse.redirect(new URL(HOMEPAGE_PATH, request.url))
      : NextResponse.next({ request: updatedRequest })

    for (const cookie of setCookieHeaders) {
      nextResponse.headers.append('set-cookie', cookie)
    }

    return nextResponse
  } catch {
    return isPublicPath ? NextResponse.next() : redirectHome(request)
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
