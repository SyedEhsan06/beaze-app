import { NextResponse } from 'next/server'
 import {cookies} from 'next/headers'
export function middleware(request) {

    const token = cookies().get('token')?.value
    // console.log("Token",)

   if(token===''){
    return   NextResponse.redirect(new URL('/login', request.url))
    
   }
    return NextResponse.next()
}
 
export const config = {
  matcher: '/account/:path*',
}