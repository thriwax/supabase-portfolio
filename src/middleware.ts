// src/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('session')
    const isLoggedIn = cookie?.value === 'true'

    const url = request.nextUrl

    // если пользователь НЕ залогинен и идет на /admin → редирект на /login
    if (!isLoggedIn && url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // если все ок — пропускаем дальше
    return NextResponse.next()
}
